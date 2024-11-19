require('./config/db')

const express = require('express')
const cors = require('cors'); 
const app = express();

const UserRouter = require('./api/User');
const ParkSpaceRouter = require('./api/ParkSpace');
const RfidRouter = require('./api/Rfid');
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json())
app.use('/user', UserRouter)
app.use('/parkspace', ParkSpaceRouter)
app.use('/card', RfidRouter)
 
app.listen(port, ()=>{
    console.log(`Server Is Running on Port ${port}`)
})
