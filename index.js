const express = require('express');
const dotenv = require('dotenv');
//const config = require('config');

// import util functions
const {saveMessage,getAllMessages} = require('./utility/message')


// import DB connection
const connectDB = require('./config/db');

// import route files
const users = require('./routes/users');
const auth = require('./routes/auth')
const conversation = require('./routes/conversation')
const messages = require('./routes/messages');
const requests = require('./routes/requests');

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
app.use('/api/requests/',requests)


// socket io connection
io.on('connection',async (socket)=>{
    console.log('a user connected', socket)


    // listen for a chat message
    socket.on('message', async(msg) => {
        let result = await saveMessage(msg);
        io.emit('message',result)
      }); 
      
      // broadcast when user disconnects
      socket.on('disconnect',()=>{
          io.emit('message','A user has left the chat')
      })
}) 



const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))