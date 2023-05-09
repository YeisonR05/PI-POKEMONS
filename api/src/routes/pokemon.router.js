const { Router } = require ('express')
const { getPokemonById, getallPokemons, savePokemon, deletePokemonById, getPokemonByName } = require('../controllers/pokemon.controllers.js')

const router = Router();
 

router.get('/', getallPokemons);
router.post('/', savePokemon);
router.get('/:id', getPokemonById); 
router.delete('/:id', deletePokemonById);
router.get('/name/:name', getPokemonByName);
 


module.exports = router;