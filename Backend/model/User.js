const mongoose = require('mongoose');
const {Schema}= mongoose;


const userSchema = new Schema ({
    email : {type:String, required:true, unique:true},
    password : {type:Buffer, required:true},
    addresses:{type:[Schema.Types.Mixed]},
    role: {type:String, default:"user",required:true},
    name: {type:String},
    mobileNumber: {type:String},
    orders: {type:[Schema.Types.Mixed]},
    salt: {type:Buffer},
    resetPasswordToken: {type:String, default:""},
},{timestamps:true})

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
});
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id  }
})

exports.User= mongoose.model('User', userSchema);