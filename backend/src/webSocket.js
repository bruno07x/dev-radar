const socketio = require("socket.io");
const parseStringToArray = require('../src/helpers/parseStringToArray');
const calculateDistance = require('../src/helpers/calculationDistance');
const connections = [];
let io;

exports.setupWebsocket = ((server) => {
    io = socketio(server);
    io.on('connection', socket =>{
        console.log(socket.id);
        const {latitude, longitude, techs} =  socket.handshake.query;
        connections.push({
            id : socket.id,
            coordinates : {
                latitude : Number(latitude),
                longitude : Number(longitude),
            },
            techs : parseStringToArray(techs),
        });
});
});

exports.findConnections = (coordinates, techs) => {
    return connections.filter( connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item))
    });
};

exports.sendMessage = (to, message, data) => {
    to.forEach(element => {
        io.to(element.id).emit(message, data);
    });
}