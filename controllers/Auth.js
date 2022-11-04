const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {

    try {
        const {
            body: { userName, email, firstName, lastName, profilePic, address, role, date, password },
        } = req;
        console.log(req);
        const createdUser = new User({
            userName,
            email,
            firstName,
            lastName,
            profilePic,
            address,
            role,
            password,
            date: date,
        });
        console.log(createdUser);
        res.status(201).send(createdUser);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = { registerUser };
