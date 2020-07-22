const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.newUser)
    .delete(controller.deleteUser);

router.get('/:id/tweets', controller.listUserTweets);

router.route('/:id')
    .get(controller.getUser)
    .put(controller.updateUser);



module.exports = router;