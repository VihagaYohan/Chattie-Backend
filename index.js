const express = require('express');
const dotenv = require('dotenv');
//const config = require('config');


// import DB connection
const connectDB = require('./config/db');

// import route files
const users = require('./routes/users');
const auth = require('./routes/auth')
const conversation = require('./routes/conversation')
const messages = require('./routes/messages');

const app = express();

// create server
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// import JSON body pharser
app.use(express.json());

// load env files
dotenv.config({ path: './config/config.env' })

// connect to DB
connectDB();

// init routes
app.use('/api/users/', users);
app.use('/api/auth/', auth)
app.use('/api/conversations/',conversation)
app.use('/api/messages/',messages)

app.get('/sample', (req, res) => {
    res.send('hello')
})

let list = [

]

// socket io connection
io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message',msg)
      });  
})



const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))