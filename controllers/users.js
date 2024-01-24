const { response, request, json } = require('express');
const  bcryptjs= require('bcryptjs');

const Usuario = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number(from))
            .limit( Number(limit))

    ])

    res.json({
        msg: 'get API - contoller',
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    //TODO validar contra BD
    if ( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
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

const usuariosDelete = async(req, res) => {

    const { id } = req.params;
    //Borrado fisico
    // conts usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        msg: 'delete API',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}