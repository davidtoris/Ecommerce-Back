// Rutas de Usuarios / Auth
// host + api/auth



const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')

const { createUser, loginUser, tokenUser } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

router.post('/new', 
            [ //Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(), 
                check('email', 'El email es obligatorio').isEmail(), 
                check('password', 'El password debe de ser de 6 caractéres').isLength( {min:6}),
                validarCampos
            ], 
            createUser)
router.post('/', 
            [
                check('email', 'El email es obligatorio').isEmail(), 
                check('password', 'El password debe de ser de 6 caractéres').isLength( {min:6}),
                validarCampos
            ], 
            loginUser)
router.get('/renew', validarJWT, tokenUser)


module.exports = router

// app.get('/', (req, res) => {

// })