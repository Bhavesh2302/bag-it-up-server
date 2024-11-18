const {Router} = require("express")
require('dotenv').config()
const Razorpay = require("razorpay")
const crypto = require("crypto")

const paymentController = Router()

paymentController.post("/orders", async(req,res)=>{

    let key_id = process.env.razorpay_key_id;
    let key_secret = process.env.razorpay_key_secret;
try {
    const instance = new Razorpay({ key_id: key_id, key_secret: key_secret })

    const options ={
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    }
    instance.orders.create(options, (err,order)=>{
   if(err){
    res.status(500).send({ msg: "Something went wrong" });
   }else if(order){
    res.status(200).json({data:order})
   }else{
    res.status(500).send({ msg: "Something went wrong" });
   }
   
    })
} catch (error) {
    if(error){
        console.log(error)
        res.status(500).send({msg : "Server Error"})
    }
}
})

paymentController.post("/verify", async (req, res) => {
    try {
        const {razorpay_order_id,  razorpay_payment_id, razorpay_signature}= req.body;
        const signature = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto.createHmac('sha256',process.env.razorpay_key_secret).update(signature.toString()).digest('hex')

            if (razorpay_signature === expectedSign) {
               res.status(200).send({ msg: "Payment verified successfully" ,status : 1});
            } else {
               res.status(400).send({ msg: "Invalid signature!!",status : 2 });
            }
        
    } catch (error) {
        console.log(error)
        res.send(500).send({msg :"Server Error"})
    }
})

module.exports = {
    paymentController
  };