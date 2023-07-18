const express = require('express');
const mongoose = require('mongoose');

async function dbConnection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/online-dnd-table');
        console.log('Connected to online-dnd-table db.');
    } catch (err) {
        console.log(err);
    }
}
dbConnection();


const app = express();
const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on ${port} port.`);
})