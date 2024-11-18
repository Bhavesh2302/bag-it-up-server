const {Router} = require('express')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')
const { Bag } = require('../models/bagModel')

const adminController = Router()

adminController.get("/dashboard", async (req, res) => {
    const bagData = await Bag.find();
    res.status(200).send({ bagData: bagData });
  });

adminController.post("/create",authentication,authorization(['admin']),async(req,res)=>{
    const bagDetails = new Bag({
        ...req.body
    })
    await bagDetails.save()
res.status(200).send({msg : "New Bag Added SucessFully"})
})

adminController.patch("/update:bagId",authentication,authorization(['admin']),async(req,res)=>{
    const payload = req.body
    const {bagId} = req.params
const bag = await Bag.findByIdAndUpdate({_id:bagId},{...payload})
    
res.status(200).send({msg : "Bag Update SucessFully"})
})

adminController.delete("/delete:bagId",authentication,authorization(['admin']),async(req,res)=>{
    const {bagId} = req.params
const bag = await Bag.findByIdAndUpdate({_id:bagId})
    
res.status(200).send({msg : "Bag Delete SucessFully"})
})



module.exports = {
    adminController
}