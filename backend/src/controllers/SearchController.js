const Dev = require('../models/Dev');
const parseStringToArray = require('../helpers/parseStringToArray');
module.exports = {
    async index(request, response){
        // Buscar todos devs
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringToArray(techs);
        const devs = await Dev.find({
            techs : {
                $in : techsArray,
            },
            location : {
                $near : {
                    $geometry : {
                        type : 'Point',
                        coordinates : [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        });
        console.log( latitude, longitude, techsArray);
        return response.json({ devs });
    }
}