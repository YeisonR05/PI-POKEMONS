const {Router} = require('express');
const {getallTypes } = require ('../controllers/types.controllers.js')


const router = Router();


router.get('/', getallTypes )
/* router.get('/', getTypebyName) a futuro, si me sale*/



module.exports = router;