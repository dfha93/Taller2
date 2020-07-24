const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet)
    .delete(controller.deleteTweet);

router.get('/lasts/:count', controller.lastNtweets); //totalNumberCommentsForTweet

router.route('/comment')
    .post(controller.newComment)
    .delete(controller.deleteComment);

router.route('/:id')
        .get(controller.getTweet);

router.route('/:id/comments/count')
.get(controller.numeroTotalCommentsPorTweet);

router.route('/top/:count')
    .get(controller.tweetsMasComentados);

router.route('/top/commenters/:count')
    .get(controller.usuariosConMasTweets);


module.exports = router;