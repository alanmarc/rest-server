const validarJWT = require('../middlewares/validar-jwt');
const isAdmin  = require('../middlewares/validar-roles');
const isRole  = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar-nombre');

module.exports = {
    ...validarJWT,
    ...isAdmin,
    ...isRole,
    ...validarCampos,
}