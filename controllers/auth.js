const bcrypt = require('bcrypt');
const User = require("../models/user");
const { generarJWT } = require('../helpers/jwt')

const createUser = async (req, res) => {
    
    const { email } = req.body
    
    try {
        
        // Comprobar si el email se repite
        
        let usuario = await User.findOne({ email })
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe ese correo'
            })
        }
        
        usuario = new User (req.body)

        // //Encriptar Password
        const newUser = new User(req.body)
        newUser.password = bcrypt.hashSync( newUser.password, bcrypt.genSaltSync(10) );
        
        await newUser.save()

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name )

        res.status(201).json({
            ok:true,
            uid : usuario.id,
            name : usuario.name,
            token
        })

        .then(data => {
            res.send({
                data
            });
        })

    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the User."
        });
    }
    
        
     
}
const loginUser = async (req, res) => {

    const {email, password } = req.body

    try {
        
        // Comprobar si el email existe
        const usuario = await User.findOne({ email })
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario no existe'
            })
        }
        
        // Comparar Password
        
        const validarPassword = bcrypt.compareSync(password, usuario.password)                                

        if(!validarPassword){
            return res.status(400).json({
                msg: 'contraseña no existe'
            })
        }
        
        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok:true,
            uid : usuario.id,
            name : usuario.name,
            token
        })

    } catch (error) {
        res.status(500).send({
            message:
            error.message
        });
    }

    
}
const tokenUser = async (req, res) => {
    
    const { uid, name } = req;

    //Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok:true,
        uid,
        name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    tokenUser
}