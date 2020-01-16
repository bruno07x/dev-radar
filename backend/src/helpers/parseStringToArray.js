module.exports =

    function parseStringToArray(stringToArray) {
         // Transformando String de techs em array
         return stringToArray.split(',').map(key => key.trim());
    }