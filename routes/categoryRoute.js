
const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')

const { createCategory, allCategory, oneCategory } = require('../controllers/categoryController');

const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

router.post('/new', 
            [ //Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(), 
                validarCampos
            ], 
            createCategory)

router.get('/', allCategory)
router.get('/:id', oneCategory)


module.exports = router
