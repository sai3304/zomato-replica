const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/index');

const localUrl = 'mongodb://127.0.0.1:27017/Zomato';
const cloudUrl = 'mongodb+srv://sunny:sai@123@cluster0.c9c2s.mongodb.net/Zomato?retryWrites=true&w=majority';

const port = process.env.PORT;
const host = '0.0.0.0';
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/', routes);
 
mongoose.connect(cloudUrl,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server Running at ${host}:${port}`)
        });
    })
    .catch()