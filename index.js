const express = require('express');
const dotenv = require('dotenv');
//const config = require('config');

// import DB connection
const connectDB = require('./config/db');

// import route files
const users = require('./routes/users');
const auth = require('./routes/auth')

const app = express();

// import JSON body pharser
app.use(express.json());

// load env files
dotenv.config({ path: './config/config.env' })

// connect to DB
connectDB();

// init routes
app.use('/api/users/', users);
app.use('/api/auth/', auth)

app.get('/sample', (req, res) => {
    res.send('hello')
})



const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))