
const mongoose = require('mongoose')
const { Address } = require('./addressModel')

const orderSchema = mongoose.Schema({
    order_status:{type:String},
    ordered_date:{type :String,required:true},
    address:{type:Object, required: true},
    cartId:{type:String}

})


const Order = mongoose.model('order',orderSchema)

module.exports = {
 Order   
}