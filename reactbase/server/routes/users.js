import express from 'express';

import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();


router.post('/',(req,res)=>{

  console.log(req.body);
  const {errors,isValid} = validateInput(req.body);
  if(isValid){
    console.log("invalid entered");
    const { username, password, timezone, email} = req.body;
    const password_digest = bcrypt.hashSync(password,10)
    console.log(password_digest);

    User.forge({
      username,timezone,email,password_digest
    }, {hasTimestamps:true}).save() .then(user => res.json({success:true}))
    .catch(err => res.status(500).json({error:err}));

    res.json({success:true})
  }else{

    res.status(400).json(errors);
  }
});

export default router;
