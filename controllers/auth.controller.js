const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secret = process.env.SECRET;

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors});
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'user already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 10); 
            const userRole = await Role.findOne({value: 'USER'}); 
            const user = new User({username, password: hashPassword, roles: [userRole.value]});

            await user.save();
            return res.json({message: 'User created successfully'});
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} not found.`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password. Please, try agian!`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token, username})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'login error'})
        }
    }
    async checkServer(req, res) {
        try {
            res.json('Server is working!')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController()