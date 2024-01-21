
const { Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-nombre');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passsword debe contener mas de 6 caracteres').isLength({ min: 8}),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN', 'USER_NORMAL']),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete );

module.exports = router;