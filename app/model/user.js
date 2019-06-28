const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const Schema=mongoose.Schema

const UserShema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:2
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(value){
                return 'invalid email/ password'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    tokens:[{
        token:{
            type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
}]
     
})



//own static method

UserShema.statics.findByCredentials=function(email,password){
    const User=this
    return User.findOne({email})
    .then(user=>{
        if(!user){
            return Promise.reject({errors:'invalid email/password'})
        }
        return bcryptjs.compare(password,user.password)
        .then(result=>{
            if(result){
                return Promise.resolve(user)
            }else{
                return Promise.reject({errors:'invaild email/password'})
            }
        })
    })
    .catch(err=>{
        return Promise.reject(err)
    })
}

//own instance method

UserShema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
        .then(user => {
            return Promise.resolve(token)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

//own statics method
UserShema.statics.findByToken=function(token){
    const User=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    console.log(tokenData)
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}
    // pre - hook

UserShema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then(function (salt) {
                bcryptjs.hash(user.password, salt)
                    .then(function (encryptedPassword) {
                        user.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

const User = mongoose.model('User', UserShema)

module.exports={User}