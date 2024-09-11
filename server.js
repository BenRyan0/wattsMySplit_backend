require('./config/db')

const express = require('express')
const app = express();

const UserRouter = require('./api/User');
const port = process.env.PORT || 5000;


app.use(express.json())
app.use('/user', UserRouter)
 
app.listen(port, ()=>{
    console.log(`Server Is Running on Port ${port}`)
})
