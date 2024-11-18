
const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
   price : {type :Number, required:true},
   qty:{type:Number, required:true,default:1},
   title:{type:String, required:true},
   image_url:{type: String, required: true},
   brand:{type: String,required:true},
   category:{type:String,required:true},
   userId :{type:String,required:true},
   bagId:{type:String, required:true}
})


const Cart = mongoose.model('cart',cartSchema)

module.exports = {
    Cart
}