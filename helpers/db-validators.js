const Role = require('../models/role');
const Usuario = require('../models/user');

const isValidRol =  async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if ( !existRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const existEmail = async( correo = '' ) => {

    //Verificar si el correo existe
    const emailExist = await Usuario.findOne({ correo });
    if ( emailExist ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existUserById = async( id ) => {

    //Verificar si el correo existe
    const idExist = await Usuario.findById(id);
    if ( !idExist ) {
        throw new Error(`El ${ id }, no existe`);
    }
}

module.exports = {
    isValidRol,
    existEmail,
    existUserById
}