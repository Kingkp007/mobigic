const userModel = require('../models/userModel')
// const fileModel = require("../models/fileModels")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const fs = require("fs");

// Register callback 
const registerController = async (req, res) => {
    try {
        // first check if user is existing or not
        console.log("Inside register controller")
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('User Already Exists')
            return res.status(200).send({ message: 'User Already Exist', success: false });
        }

        // now hash the password that user entered while creating account

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // save it in db

        const newUser = new userModel(req.body);
        await newUser.save();
        console.log('User added successfully')
        res.status(201).send({ message: 'Register Successfully', success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User Not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // success response after token creation
        res.status(200).send({ message: 'Login Success', success: true, token: token, email:user.email, userId : user._id});

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: 'User Not found', success: false })
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Auth Error', success: false, error });
    }
}


module.exports = { loginController, registerController, authController } 