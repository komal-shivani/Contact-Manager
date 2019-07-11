const mongoose=require('mongoose')

mongoose.Promise=global.Promise
mongoose.set('useCreateIndex', true)
const connection_uri = process.env.MONGODB_URI || 'mongodb+srv://komal-shivani:9980445081ks@cluster0-kduxw.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connection_uri, {
        useNewUrlParser: true
    })
// mongoose.connect('mongodb://localhost:27017/contact-manager-app',{useNewUrlParser:true})
.then((res)=>{
    console.log('connected to db successfully')
})
.catch((err)=>{
    console.log('error connecting to db')
})
module.exports=mongoose