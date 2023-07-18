const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/verifyToken');

dotenv.config();

async function dbConnection() {
    try {
        await mongoose.connect(`${process.env.DB_HOST_AND_PORT}/${process.env.DB_NAME}`);
        console.log('Connected to mongoDB.');
    } catch (err) {
        console.log(err);
    }
}
dbConnection();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);



app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
});