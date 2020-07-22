const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet)
    .delete(controller.deleteTweet);


router.get('/lasts/:count', controller.lastNtweets); //totalNumberCommentsForTweet
router.get('/:id/comments/count', controller.totalNumberCommentsForTweet);

router.route('/comment')
    .post(controller.newComment)
    .post(controller.deleteComment);
router.route('/:id')
        .get(controller.getTweet);

module.exports = router;