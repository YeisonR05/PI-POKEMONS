const axios = require('axios');
const { Types } = require('../db.js');


module.exports = {
  getallTypes: async () => {
    try {
      let typesDB = await Types.findAll();
      if (typesDB.length===0) {
        let dataFromAPI = await axios.get(`https://pokeapi.co/api/v2/type`);
        let typesAPI = dataFromAPI.data.results.map((type) => {
          return {
            name: type.name,
          };
        });
        Types.bulkCreate(typesAPI);
        return await Types.findAll();
      } else {
        return typesDB;
      }
    } catch (error) {
      throw `Error ${error} in getAllType `;
    }
  },
};