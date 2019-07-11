const express=require('express')
const cors=require('cors')
const app=express()
const path = require("path");
const port = process.env.PORT || 3005

const mongoose = require('./config/database')
const router=require('./app/controller/contactController')
const {usersRouter}=require('./app/controller/userController')


app.use(express.json())
app.use(cors())
app.use('/contacts',router) 
app.use('/users', usersRouter)
app.use(express.static(path.join(__dirname, "cm-client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/cm-client/build/index.html"))
})
app.listen(port,()=>{
    console.log('listening to port',port)
})






