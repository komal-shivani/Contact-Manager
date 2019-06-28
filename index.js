const express=require('express')
const cors=require('cors')
const app=express()
const port=3005

const mongoose = require('./config/database')
const router=require('./app/controller/contactController')
const {usersRouter}=require('./app/controller/userController')

console.log("inside index")
app.use(express.json())
app.use(cors())
app.use('/contacts',router) 
app.use('/users', usersRouter)

app.listen(port,()=>{
    console.log('listening to port',port)
})



