const axios = require('axios');  //Se importa Axios
const { Type } = require('../db');

const getTypes = async (req, res) => {
    try{
        const urlTypes = await axios.get('https://pokeapi.co/api/v2/type'); //Trae la URL de la API definida por tipo
        const allTypes = urlTypes.data.results;
        allTypes.forEach( e => {
            Type.findOrCreate({
                where: {
                    name: e.name, 
                },
            });
        });
 
        const dbTypes = await Type.findAll();//esta linea es importante
        res.send(dbTypes);
    }catch(error){
        console.log(error);
    };
};

module.exports = {
    getTypes,
};



