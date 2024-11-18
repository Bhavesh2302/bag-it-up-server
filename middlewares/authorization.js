const { User } = require("../models/UserModel")

const authorization = (role) =>async (req,res,next)=>{
const permittedRole = role

const user = await User.findOne({_id : userId})

if(user?.role){
  if(permittedRole.includes(user.role)){
    next()
  }else{
     res.status(401).send({msg : "User not authorized"})
  }
}

}

module.exports={
    authorization
}