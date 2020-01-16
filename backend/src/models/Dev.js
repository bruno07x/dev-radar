const mongoose = require("mongoose");
const PointSchema = require('../models/helpers/PointSchema');
// Schema do banco de dados
const devSchema = new mongoose.Schema({
    name : String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type : PointSchema,
        index : "2dsphere"
    }
});
// Exportação do model
module.exports = mongoose.model('Dev', devSchema);