const { Router } = require ('express');
const { getAllPokemons, getPokemonById, createPokemon, } = require('../controllers/pokemon.controllers.js');
const { Pokemon } = require('../db.js');

const router = Router();
 
router.get('/', getAllPokemons)
router.get('/:id', getPokemonById); 
router.post('/', createPokemon);
 


module.exports = router; 