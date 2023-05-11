const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getAllPokemons, createPokemon, getPokemonById } = require('../controllers/pokemon.controllers');
const { getAllTypes } = require('../controllers/types.controllers');


const router = Router();
 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', getAllPokemons);
router.use('/pokemons/:id', getPokemonById);
router.use('/pokemons', createPokemon);
router.use('/types', getAllTypes);


module.exports = router;
