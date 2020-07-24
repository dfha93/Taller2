
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const api = require('./api');

app.use(express.json());
app.use('/api', api);
//protocol://user:password@host:port/resource
//mongodb://localhost/twitter
mongoose.connect('mongodb+srv://damell:uninorte@cluster0.yn1qn.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Conectado a la base de datos");
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});
