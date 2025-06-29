const mongoose = require("mongoose");
const Schema= mongoose.Schema;


const orderSchema= new Schema({
    products:[{type:Schema.Types.Mixed, required:true}],
    totalAmount:{type:Number, required:true},
    totalItems:{type:Number, required:true},
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    paymentMethod:{type:String, required:true},
    paymentStatus:{type:String, required:true,default:'Pending'},
    status:{type:String, default:'Pending'},
    selectedAddress:{type:Schema.Types.Mixed, required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}

},{timestamps:true})

const virtual=orderSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    tranform:function(doc,ret){delete ret._id}
})


exports.Order=mongoose.model('Order',orderSchema);