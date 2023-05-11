const axios = require('axios');
const { Pokemon , Type } = require("../db");


//Trae todos los pokemons de API
 const pokeApi = async (name) => {
  try {
    if( name ) {
      const pokemonByName = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}` //Pegamos la URL de la Api de pokemons por nombre
        );
      if (pokemonByName) {
        return {
          id: pokemonByName.data.id,
          name: pokemonByName.data.name,
          hp: pokemonByName.data.stats[0].base_stat,
          attack: pokemonByName.data.stats[1].base_stat,
          defense: pokemonByName.data.stats[2].base_stat,
          speed: pokemonByName.data.stats[5].base_stat,
          height:pokemonByName.data.height,
          weight: pokemonByName.data.weight,
          image: pokemonByName.data.sprites.versions["generation-v"]["black-white"].front_default,
          types: pokemonByName.data.types.map((pokemon) => {
            return { name: pokemon.type.name };
          }),
        };
      } else {
        return [];
      }
    } else {
      const pokemonsApi = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const subRequest = pokemonsApi.data.results.map((pokemon) => axios.get(pokemon.url));
      let promiseRequest = await Promise.all(subRequest);

      promiseRequest = await promiseRequest.map((pokemon) => {
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          hp: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          image: pokemon.data.sprites.versions["generation-v"]["black-white"].front_default,
          createInDb: "false",
          types: pokemon.data.types.map((pokemon) => {
            return { name: pokemon.type.name};
          }),
        };
      });
      return promiseRequest; //Retorna el Array con los pokemons de la Api
    }
  } catch (error) {
    console.log(error);
  }
};


const pokeDb = async (name) => {
  try {
    let pokemon = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (name) {
      const pokdb= pokemon.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
    return pokdb;
    } else {
      return pokemon
    
    }
  } catch {
    // res.status(500).json("Pokemon not found");//c esto no encuentra los pokemons
    console.log("Pokemon not found in db");
  }
};


//Trae todos los pokemones de la API
const getAllPokemons = async () => {
  try{
    const { name } = req.query;
    const pokemonsApi = await pokeApi(name);
    console.log( pokemonsApi);
    const pokemonsDb = await pokeDb(name);
    let pokemonDbAndApi = [];
    if(!pokemonsApi && name){
        pokemonDbAndApi = pokemonsDb;
    }else if(!pokemonsDb && name){
        pokemonDbAndApi = pokemonsApi;
    }else{
        if (Array.isArray(pokemonsDb) && pokemonsDb.length > 0) {
            pokemonDbAndApi = pokemonsDb.concat(pokemonsApi);
        } else {
            pokemonDbAndApi = pokemonsApi;
        }
    };
    res.send(pokemonDbAndApi);
}catch(error){
    console.log(error);
};
};

// Trae Pokemons por ID 
const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    if(id.length <= 4 ) {
      let pokemonApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let pokemonByIdApi = [
        {
          id: pokemonApiId.data.id,
          name: pokemonApiId.data.name,
          hp: pokemonApiId.data.stats[0].base_stat,
          attack: pokemonApiId.data.stats[1].base_stat,
          defense: pokemonApiId.data.stats[2].base_stat,
          speed: pokemonApiId.data.stats[5].base_stat,
          height: pokemonApiId.data.height,
          weight: pokemonApiId.data.weight,
          image: pokemonApiId.data.sprites.versions["generation-v"]["black-white"].front_default,
          creaInDb: "false",
          types: pokemonApiId.data.types.map((e) => {
            return { name: e.type.name};
          }),
        },
      ];
      res.send(pokemonApiId);
    } else {
      let pokemon = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let pokemonIdDb = pokemon.filter((pokemon) => pokemon.id === id);
      res.send(pokemonIdDb);
    }
  } catch (error) {
    console.log(error);
  }
}


const createPokemon = async (req, res) => {
  console.log("Aquí creo el Pokemon")
};


    module.exports = { 
        getAllPokemons, 
        createPokemon, 
        getPokemonById,
      };