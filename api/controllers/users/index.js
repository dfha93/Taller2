const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');

const getAll = (req, res) =>{
    User.find({}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then((response)=>{
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};

//Taller2

const updateUser = (req, res) => { ///////REVISAR
    const UserId = req.body.id;
    const user = {
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    User.updateOne({_id :UserId}, {$addToSet: user})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    //res.send("Actualizar usuario");
};
const deleteUser = (req, res) => { //REVISAR
    const UserId = req.body.id;
    User.deleteOne({_is:UserId})
    .then( response =>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    //res.send("Borrar usuario");
};

// 6. lista de tweets del usuario
const listUserTweets = (req, res) => {  
    const user_id = req.params.id;
    
    Tweet.find({user : user_id}, ["content", "createdAt"])
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
  };


module.exports = {
    getAll,
    getUser,
    newUser,
    updateUser,
    deleteUser,
    listUserTweets
};