const express = require('express');
const app = express();

// const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT;

const authRoute = require('./routes/auth');
const drinksRoute = require('./routes/drinks');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', authRoute);
app.use('/api/drinks', drinksRoute);

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})