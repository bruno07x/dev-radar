// Importando somente o módulo de roteamento
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
// Função de roteamento do Express
const routes = Router();
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);
// Exportando roda para aplicação conseguir reconhecer
module.exports = routes;
