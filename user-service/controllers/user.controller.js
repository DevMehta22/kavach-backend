require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        //check if email and password are provided
        if(!email || !password) 
        return res.status(400).send({msg:"All feilds are required"});
    //find the user by email
    const user = await userSchema.findOne({email:email});
    if(user){
        //if user exists check the password
        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).send({ msg: 'Invalid Password' });
        //create token
        jwt.sign(
            {id:user._id,
            role:user.role},
            process.env.SECRET_KEY ,
            {expiresIn:'3d'},
            (err,token)=> {
                if (err) throw err;
                res.json({
                    token,
                    user:{
                        id : user.id,
                        email : user.email,
                        role : user.role
                        }
                });
            }
        )
    }else{
        return res.status(400).send({msg:"User does not exist!"})
    }
}catch(err){
    console.log(err);
}
}

const signup = async(req,res)=>{
    const {email,password,role} = req.body;
    if(!email || !password || !role){
        return res.status(400).send("All fields are required");
    }

    const ifUser = await userSchema.findOne({email});
    if(ifUser) return res.status(400).send("Email already in use");
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            const user = new userSchema({
                email,
                password:hash,
                role
                })
                user.save()
                .then(data=>{
                    jwt.sign(
                        {id:user._id},
                        process.env.SECRET_KEY,
                        { expiresIn: "3d" },
                        (err,token)=>{
                            if(err)throw err;
                            res.json({
                                token,
                                user:{
                                    email:data.email
                                }
                            })
                        }
                    )
                })
        })
    })
}

module.exports = {login,signup}
