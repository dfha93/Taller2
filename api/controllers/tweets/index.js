const Tweet = require('./../../models/tweets');
const {ObjectId} = require('mongodb');

const getTweets = (req, res) =>{
    Tweet
    .find({})
    .populate('user', 'username')
    .populate('comments.user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getTweet = (req, res) => {
    const id = req.params.id;
    Tweet
    .find({_id : id})
    .populate('user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newTweet = (req, res) => {
    const tweet = {
        content: req.body.content,
        user: req.body.user
    };
    if(tweet.content && tweet.user){
        const object = new Tweet(tweet);
        object.save()
        .then((response)=>{
            res.status(201).send(response);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};
const newComment = (req, res) => {
    const tweet = req.body.tweet;
    const comment = {
        comment: req.body.comment,
        user: req.body.user
    };
    Tweet.updateOne({_id :tweet}, {$addToSet: {comments : comment}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
};

//Taller 2

const deleteTweet = (req, res) => { //////REVISAR
    const tweet = req.body.tweet;
    Tweet.deleteOne({_id : tweet})
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
    
    //res.send("Borrar tweet");
};


const deleteComment = (req, res) => {  //////////////// REVISAR
    const tweet = req.body.tweet;
    const comment = req.body.comment
    Tweet.updateOne({_id :tweet}, {$pull: {comments : { _id: comment }}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
  };


// 7. lista de ultimos {n} tweets. /api/tweets/lasts/:count
const lastNtweets = (req, res) => {  
    const count = parseInt(req.params.count);

   Tweet.find({}).sort({"createdAt": -1}).limit(count)
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
  };

// 8.  GET /api/tweets/:id/comments/count - Número total de comentarios de un tweet
  const totalNumberCommentsForTweet = (req, res) => {  
    const tweet_id = parseInt(req.params.id);

    //Tweet.aggregate([{ $match: { _id: ObjectId(tweet_id) }},{ $project: {_id:1, commentsCount: { $cond: { if: { $isArray: "$comments" }, then: { $size: "$comments" }, else: "NA"} }}}])
    Tweet.aggregate([{ $project: {_id:1, commentsCount: { $cond: { if: { $isArray: "$comments" }, then: { $size: "$comments" }, else: "NA"} }}}])
    .then(response=>{
        console.log(response)
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
  };



module.exports = {
    getTweets, 
    getTweet, 
    newTweet, 
    deleteTweet, 
    newComment, 
    deleteComment,
    lastNtweets,
    totalNumberCommentsForTweet
    
};