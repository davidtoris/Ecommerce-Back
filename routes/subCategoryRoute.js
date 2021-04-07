
const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')

const { createSubCategory, allSubCategory, oneSubCategory } = require('../controllers/subCategoryController');

const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

router.post('/new', 
            [ //Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(), 
                validarCampos
            ], 
            createSubCategory)

router.get('/', allSubCategory)
router.get('/:id', oneSubCategory)


module.exports = router

// app.get('/', (req, res) => {

// })