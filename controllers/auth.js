const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario/Pasword no son correctas - correo'
            });
        }

        //Si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario/Pasword no son correctas - estado: false'
            });
        }

        //Verificar la contraseña
        const valPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !valPassword ) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - pass'
            });
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}