const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth")
const config = require("config");
const jwt = require('jsonwebtoken');
const User = require("../../models/User.js")

router.post("/",auth, (req, res) =>{
    const {name, email, password} = req.body; 
    if (!name || !password || !email){
        return res.status(400).json({msg: "Enter all field"})
    }
    User.findOne({email: email})
        .then(user => {
            if (user){
                return res.status(400).json({msg: "User already exist"})
            }
            const newUser = new User({
                name,
                email,
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign({
                                id : user.id
                            },
                            config.get('jwtSecret'),
                            {expiresIn: 3600},
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                token,    
                                user: {
                                    id: user._id,
                                    name : user.name,
                                    email: user.email
                                    
                                }})
                            }
                            )
                        })
                })
            })
        })
});
module.exports = router;