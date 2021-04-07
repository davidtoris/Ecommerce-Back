
const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')

const { createProduct, allProduct, oneProduct } = require('../controllers/productController');

const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

router.post('/new', 
            [ //Middlewares
                check('title', 'El título es obligatorio').not().isEmpty(), 
                validarCampos
            ], 
            createProduct)

router.get('/', allProduct)
router.get('/:id', oneProduct)


module.exports = router
