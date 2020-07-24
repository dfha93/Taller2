const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');
const { response } = require('express');

const getAll = (req, res) =>{
    User.find({}, ["name", "username", "email", "password", "telephone"])
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username", "email"])
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
    const UserId = req.params.id;
    console.log(req)
    User.updateOne({_id :UserId}, {$set: {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email}})
    .then(response=>{
        res.status(200).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    //res.send("Actualizar usuario");
};



const deleteUser = (req, res) => { //REVISAR
    const UserId = req.body.id;
    console.log(req)
    User.deleteOne({_id:UserId})
    .then( response =>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
    //res.send("Borrar usuario");
};

const TweetsTotalesDeUsuario = (req, res) => {
    const user = req.body.user;
    Tweet.find({user: {_id: user}})
    .then(response=>{
        res.status(200).send(`Tweetts del usuario: ${response.length}`);
    })
    .catch((err)=>{
        res.sendStatus(500).send(err);
    });
}



module.exports = {getAll, getUser, newUser, updateUser, deleteUser, TweetsTotalesDeUsuario};