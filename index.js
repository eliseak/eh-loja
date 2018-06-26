const express = require('express');
const expressMongoDB = require('express-mongo-db');
const cors = require('cors');

const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const app = express();

//app.use(expressMongoDB('mongodb://localhost/ehloja')); //localhost
app.use(expressMongoDB('mongodb://ehloja:ehloja123@165.227.221.155/ehloja')); //servidor mastertech
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor ok!');
})

// INSERIR novo cliente
app.post('/cliente', (req, res) => {
    let cliente = {
        cpf: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email
    };

    req.db.collection('clientes').insert(cliente, (error) => {
        if (error){
            res.status(500).send();
            return;
        }
    
        res.send(cliente);
    })
});

// LER todos os clientes no banco
app.get('/clientes', (req, res) => {
    req.db.collection('clientes').find().toArray((error, data) => {
        if (error){
            res.status(500).send();
            return;
        }
        res.send(data);
    })
})

// LER o cliente no banco por EMAIL
app.get('/clientes/:email', (req, res) => {
    let query = {
        email: req.params.email
    }
    req.db.collection('clientes').findOne(query, (error, data) => {
        if (error){
            res.status(500).send();
            return;
        }
        
        res.send(data);
    })
})

// Primeira porta para o Heroku, caso não encontrado: utiliza porta 3000
app.listen(process.env.PORT||3000, () => console.log('Aplicacao iniciada'));

