const Tweet = require('./../../models/tweets');
const {ObjectId} = require('mongodb');

let Sort = (Tweets, count) => {
    
    const result = [];
    Tweets.sort((a, b) => {
        if (a.comments.length > b.comments.length) {return 1;}
        if (a.comments.length < b.comments.length) {return -1;}
        return 0;
    });
    for(i=0; i < count; i++) {result.push(Tweets[Tweets.length - i - 1]);}
    return result;
}

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
// 3. Borrar Tweet
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

// 4. Borrar Comment
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

// 8.  Número total de comentarios de un tweet
const numeroTotalCommentsPorTweet = (req, res) => {
    const Userid = req.params.id
    Tweet.find({_id : Userid}, ["_id", "comments"])
    .then(response => {        
        const result = {
            
            id: response[0]._id,
            cantidad: response[0].comments.length
        }
        console.log(result)
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

//9. Lista de n tweets mas comentados.
const tweetsMasComentados = (req, res) => {
    const count = Number(req.params.count);
    console.log(count)
    Tweet.find({},['_id', 'comments'])
    .then((response)=>{
        res.status(200).send(Sort(response, count));
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

//10 Lista de {n} usuarios con mayor número de tweets

const usuariosConMasTweets = (req, res) => {
    const count = Number(req.params.count);
    Tweet.aggregate([{ $group: { _id: '$user', count: { $sum: 1 } } }, { $sort : { count: -1 } }])
    .limit(count)
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500).res.send(err);
    });
}

module.exports = {getTweets, getTweet, newTweet, deleteTweet, newComment, deleteComment, lastNtweets, 
    numeroTotalCommentsPorTweet, tweetsMasComentados, usuariosConMasTweets
};
