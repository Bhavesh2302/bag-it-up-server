const mongoose = require('mongoose')

const bagSchema = mongoose.Schema({
    title:{type: String, required : true},
    brand: {type: String, required : true},
    category:{type: String, required : true},
    size:{type: String, required : true},
    color:{type: String, required : true},
    actual_price:{type: Number, required : true},
    discounted_price:{type: Number,},
    rating:{type:Number},
    discount:{type: String},
    image_url_1:{type: String, required : true},
    image_url_2:{type: String, required : true},
    image_url_3:{type: String, required : true},
    image_url_4:{type: String, required : true},
    userId :{type:String}
})

const Bag = mongoose.model('bag',bagSchema)

module.exports= {
    Bag
}