const User = require("./user");
const Role = require("./role");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {secret} = require("./config");


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class AuthController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "username already exist"});
            };
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = await User.create({username: username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            res.status(200).json({message: `Registration of ${username}, completed!`})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "registration error"})
        }
    };
    async login (req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(200).json({message: "User is not registered"})
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(200).json({message: "password is not correct"})
            };
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "login error"})
        }
    };
    async getUsers (req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    };
};


module.exports = new AuthController();