const { response } = require('express');

const isAdmin = ( req, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

     const { rol, nombre } = req.usuario;

     if (  rol != 'ADMIN') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esta acción`
        });
     }

    next();
}

const isRole = ( ...roles ) => {


    return ( req, res = response, next ) => {
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primereo'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}

module.exports = {
    isAdmin,
    isRole
}