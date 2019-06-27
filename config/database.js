const mongoose=require('mongoose')

mongoose.Promise=global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/contact-manager-app',{useNewUrlParser:true})
.then((res)=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db')
})

module.exports=mongoose