const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
   title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    price: { type: Number, min:[1, 'wrong min price'], max:[1000000, 'wrong max price']},
    discountPercentage: { type: Number, min:[1, 'wrong min discount'], max:[99, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String, required: true},
    category: { type : String, required: true},
    warrantyInformation: { type : String},
    shippingInformation: { type : String, required: true},
    reviews: [],
    returnPolicy: { type : String, required: true},
    minimumOrderQuantity: { type : Number, required: true},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed]},
    highlights:{ type : [String] },
    discountPrice: { type: Number},
    deleted: { type : Boolean, default: false},
});

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id
})
productSchema.set('toJSON',{
virtuals: true,
versionKey:false,
transform:function(doc,ret){delete ret._id  }
})

exports.Product=mongoose.model("Product",productSchema)