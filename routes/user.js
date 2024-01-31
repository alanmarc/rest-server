
const { Router} = require('express');
const { check } = require('express-validator');

const {validarJWT, validarCampos, isAdmin, isRole } = require('../middlewares');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users');
const { isValidRol, existEmail, existUserById } = require('../helpers/db-validators');



const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom(isValidRol),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passsword debe contener mas de 6 caracteres').isLength({ min: 8}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existEmail ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN', 'USER_NORMAL']),
    check('rol').custom(isValidRol),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    //isAdmin,
    isRole('ADMIN', 'SUPER_ADMIN'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
], usuariosDelete );

module.exports = router;