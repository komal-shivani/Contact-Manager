const mongoose=require('mongoose')

//Schema -ocb

const Schema=mongoose.Schema

const ContactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String
    }
})

const Contact=mongoose.model('Contact',ContactSchema)

module.exports=Contact