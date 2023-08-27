const jwt =require('jsonwebtoken')
const express = require('express')
const { User } = require("../database");
const {Admin} = require('../database')
const {z} = require ('zod')
const router = express.Router();
const {SECRETKEY,authenticatejwt} = require('../middleware/')

const inputsProps = z.object({
    username:z.string().min(5).email(),
    password:z.string().min(6).max(14)
})

router.post('/admin/signup', async (req, res) => {
    const parseInput = inputsProps.safeParse(req.body)
    if(!parseInput.success){
            return res.json({msg:parseInput.error})
    }
    const username = parseInput.data.username;
    const password = parseInput.data.password;
    const isAdmin =true
    const admin = await Admin.findOne({ username });
    if (admin) {
        return res.status(403).json({ message: 'user already exists' });
    }
    const newAdmin = new Admin({ username, password,isAdmin:isAdmin});
    await newAdmin.save();
    const token = jwt.sign({ username: newAdmin.username ,id: newAdmin._id,isAdmin:isAdmin}, SECRETKEY, { expiresIn: '1h' });
    res.json({ message: 'user registered successfully', token });
});

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username: admin.username,id:admin._id,isAdmin:admin.isAdmin }, SECRETKEY, { expiresIn: '1h' });
        return res.json({ message: 'user logged in successfully', token });
    }
    res.status(403).json({ message: 'user does not exist or incorrect credentials' });
});
router.get('/me',authenticatejwt,async (req,res)=>{
    const recruter = await Admin.findOne({username:req.user.username})
    const candidate = await User.findOne({username:req.user.username})
    if(recruter){
        res.json({'username':recruter})
    } else{
        res.json({'username':candidate})
    }
    
    
})

// user authentication

router.post('/user/signup', async (req, res) => {
    const { username, password ,isUser=true} = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(403).json({ message: 'user already exists' });
    }
    const newUser = new User({ username, password ,isUser});
    await newUser.save();
    const token = jwt.sign({ username: newUser.username,id:newUser._id,isUser:isUser }, SECRETKEY, { expiresIn: '1h' });
    res.json({ message: 'user registered successfully', token });
});

router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username: user.username,id:user._id,isUser:user.isUser }, SECRETKEY, { expiresIn: '1h' });
        return res.json({ message: 'user logged in successfully', token });
    }
    res.status(403).json({ message: 'user does not exist or incorrect credentials' });
});
router.get('/user/me',authenticatejwt,async (req,res)=>{
    const user = await User.findOne({username:req.user.username})
    res.json({'username':user.isUser})
})

module.exports = router;