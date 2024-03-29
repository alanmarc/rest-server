const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');


const validarJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETKEY);
        
        //Leer el usuario que corresponde
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no exister DB'
            })
        }
        

        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario con stado false'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}