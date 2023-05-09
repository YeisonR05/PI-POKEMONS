const { Router } = require('express');
const typesRouter = require ('./types.router.js')
const pokemonRouter = require ('./pokemon.router')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemons', pokemonRouter)

router.use('/pokemontypes', typesRouter)

router.use('/pokemons/:id', pokemonRouter)

router.use('/types', typesRouter)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
