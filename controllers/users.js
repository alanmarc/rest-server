const { response, request, json } = require('express');
const  bcryptjs= require('bcryptjs');

const Usuario = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - contoller',
        q,
        nombre,apikey,
        page,
        limit
    });
}

const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { password, google, correo, ...resto} = req.body;

    //TODO validar contra BD
    if ( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSalt();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto );
    res.status(500).json({
        msg: 'put API',
        usuario
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol, estado} = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol, estado} );

    //Encriptar la copntraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API',
        usuario
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}