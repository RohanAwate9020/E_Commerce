const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
 
  quantity: { type: Number, default: 1 },
  user:{ type:Schema.Types.ObjectId,ref:"User", required: true },
  product: {type:Schema.Types.ObjectId,ref:"Product", required: true},
  color: {type:Schema.Types.Mixed, },
  size: {type:Schema.Types.Mixed, },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", cartSchema);
