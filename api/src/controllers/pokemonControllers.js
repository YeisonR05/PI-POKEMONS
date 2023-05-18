const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Traer los Pokemons de la API
const pokemonApi = async (name) => {
  try { 
    if (name) {
      const pokemonByName = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`  
      );
      if (pokemonByName) {
        return {
          id: pokemonByName.data.id,
          name: pokemonByName.data.name,
          hp: pokemonByName.data.stats[0].base_stat,
          attack: pokemonByName.data.stats[1].base_stat,
          defense: pokemonByName.data.stats[2].base_stat,
          speed: pokemonByName.data.stats[5].base_stat,
          height: pokemonByName.data.height,
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
        "https://pokeapi.co/api/v2/pokemon?limit=60" // URL PI, Se limita a traer 48 Pokemons
      );
      const subRequest = pokemonsApi.data.results.map((e) => axios.get(e.url));
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
          image:
          pokemon.data.sprites.versions["generation-v"]["black-white"]
              .front_default,
          createInDb: "false",
          types: pokemon.data.types.map((pokemon) => {
            return { name: pokemon.type.name };
          }),
        };
      });
      return promiseRequest;//retorna el array de Pokemons de la API
    }
  } catch (error) {
    console.log(error);
  }
};

// Traer el pokemon de la base de datos
const pokemonDb = async (name) => {
  try {
    let pokemon = await Pokemon.findAll({ //Busca todos los Pokemons que se encuentran en la DB
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (name) {
      const pokdb= pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
    return pokdb;
    } else {
      return pokemon
    
    }
  } catch {
    console.log("El Pokemon no se encuentra en la base de datos");
  }
};

// Traer los Pokemons de la API y DB
const getPokemons = async (req, res) => {
  try{
      const { name } = req.query;
      const pokemonsApi = await pokemonApi(name); 
      const pokemonsDb = await pokemonDb(name);
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
      res.send(pokemonDbAndApi); //Si se cumple todo, trae los Pokemons
  }catch(error){
      console.log(error);
  };
};

// Traer Pokemon por su ID
const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length < 5) {
      let pokemonApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      let pokemonByIdApi = [
        {
          id: pokemonApi.data.id,
          name: pokemonApi.data.name,
          hp: pokemonApi.data.stats[0].base_stat,
          attack: pokemonApi.data.stats[1].base_stat,
          defense: pokemonApi.data.stats[2].base_stat,
          speed: pokemonApi.data.stats[5].base_stat,
          height: pokemonApi.data.height,
          weight: pokemonApi.data.weight,
          image:
            pokemonApi.data.sprites.versions["generation-iii"]["emerald"]
              .front_default,
          createInDb: "false",
          types: pokemonApi.data.types.map((e) => {
            return { name: e.type.name };
          }),
        },
      ];
      res.send(pokemonByIdApi);
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
      let pokemonIdDb = pokemon.filter((e) => e.id === id);
      res.send(pokemonIdDb);
    }
  } catch (error) {
    console.log(error);
  }
};

// Crear un nuevo Pokemon
const createPokemon = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;
    const findPokemon = await Pokemon.findOne({
      where: { name: name.toLowerCase() },
    });
    if (findPokemon) {
      res.send("El Pokemon creado ya existe");
    } else {
      let newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        image: image,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
      });
      let pokemonType = await Type.findAll({
        where: {
          name: types,
        },
      });
      await newPokemon.addTypes(pokemonType);
      res.status(200)
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemons,
  createPokemon,
  getPokemonById,
};
