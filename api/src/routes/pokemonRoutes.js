const { Router } = require('express');
const { getPokemons, createPokemon, getPokemonById, getPokemonByName } = require('../controllers/typesControllers');

const router = Router();

router.get('/', getPokemons);//query {name} ?name=pikachu
router.get('/:id', getPokemonById);//params
router.get('/:name', getPokemonByName);//params
router.post(`/`, createPokemon);//query {name}

module.exports = router; 