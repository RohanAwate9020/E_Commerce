const mongoose = require('mongoose');
const {Schema}= mongoose;


const userSchema = new Schema ({
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    addresses:{type:[Schema.Types.Mixed]},
    role: {type:String, default:"user",required:true},
    name: {type:String, required:true},
    orders: {type:[Schema.Types.Mixed]}
})

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