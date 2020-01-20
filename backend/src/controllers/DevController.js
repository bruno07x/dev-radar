// Importando axios para requisição de API
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../helpers/parseStringToArray');
const { findConnections, sendMessage } = require('../webSocket');
module.exports = {
    // Como a requisição da API pode demorar usa-se o async
    async index (request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store (request, response) {
        // Destruction para trazer a informação de dentro
        const { github_username, techs, latitude, longitude} = request.body;
        // Verificar se o usuário já existe na base de dados
        let responseDB = await Dev.findOne({ github_username });
        if(!responseDB){
            // Transformando String de techs em array
            const techsArray = parseStringToArray(techs);
            // Trabalhando com Latitude e Longitude
            const location = {
                type : 'Point',
                coordinates : [longitude, latitude]
            }
            // GET da API Github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            // Destruction pegando os dados da API do github
            const { name = login, avatar_url, bio } = apiResponse.data;
            console.log(name, avatar_url, bio, github_username, techsArray, latitude, longitude );

            // Gravando dados no DB
            responseDB = await Dev.create({
                name : name,
                github_username: github_username,
                bio: bio,
                avatar_url: avatar_url,
                techs: techsArray,
                location : location
            });
            // Filtrar conexões que estão a 10km e técnologias  similares
            const sendSocketMessageTo = findConnections(
                {latitude, longitude}, techsArray,
            )
            sendMessage(sendSocketMessageTo, 'new-dev', responseDB);
        }
        return response.json(responseDB);
    }
}