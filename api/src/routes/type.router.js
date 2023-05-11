const {Router} = require('express');
const {getAllTypes } = require ('../controllers/types.controllers')


const router = Router();


router.get('/', getAllTypes )
/* router.get('/', getTypebyName) a futuro, si me sale*/



module.exports = router;