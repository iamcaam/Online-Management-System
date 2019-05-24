// @login & register
const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');

const User = require('../../models/User');

// $route GET api/users/test
// @desc 返回的請求的json數據
// @access public
router.get("/test", (req, res) => {
    res.json({msg: "login works"});
})

// $route POST api/users/register
// @desc 返回的請求的json數據
// @access public
router.post("/register", (req, res) => {
    // console.log(req.body);

    // 查詢DB中是否有email
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({email: "郵箱已被註冊!"})
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', 
                    r: 'pg', 
                    d: 'mm'
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,    
                    password: req.body.password, 
                    // identity: req.body.identity
                })
                
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                    });
                }); 
            }
        })
        .catch();
})



module.exports = router;