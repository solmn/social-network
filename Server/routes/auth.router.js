const
    path = require('path'),
    router = require('express').Router(),
    { authConroller } = require(path.join(__dirname, '..', 'controllers'));

router.post('/signup', authConroller.register);
router.post('/login', authConroller.login);
router.post('/forgot-password', authConroller.forgotPassword);
router.post('/reset-password', authConroller.resetPassword);
router.post('/activate-account', authConroller.activateAccount)
    //router.post('/user/update', authConroller.updateUser);


module.exports = router;