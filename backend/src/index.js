// Requisição de objeto Express
const express = require('express');
// Requisição de objeto mongoose
const mongoose = require('mongoose');
// Requisição de arquivo routes.js criado
const routes = require('../src/routes');
// Conexao com servidor mongodb Atlas
mongoose.connect('mongodb+srv://bcouto:b1c7o3u2to@cluster0-vrw2c.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Função express()
const app = express();
// Habilitando Express para entender formato json
app.use(express.json());

app.use(routes);
// Parâmetro 1 = Rota, Paramêtro 2 = Function com parâmetros de resquest & response
// Query Params acessado através do => resquest.query
app.get('/user', (request, response) => {
    console.log(request.query);
    // Não esquecer o return, por se tratar de uma função. ;D
    // Retornar sempre um json
    return response.json({
        message: 'Uso de parâmetros Express => query params',
    });
});
// :nome-do-parametro
// Route Params acessado através do => resquest.params
app.delete('/user/:id', (request, response) => {
    console.log(request.params);
    // Não esquecer o return, por se tratar de uma função. ;D
    // Retornar sempre um json
    return response.json({
        message: 'Uso de parâmetros Express => route params',
    });
});
// Body dados para criação ou alteração de um registro acessado através do => resquest.body
app.post('/user', (request, response) => {
    console.log(request.body);
    // Não esquecer o return, por se tratar de uma função. ;D
    // Retornar sempre um json
    return response.json({
        message: 'Uso de parâmetros Express => body',
    });
});
app.listen(3333);