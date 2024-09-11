
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User model
const User = require('../models/UserModel'); // Assuming this is correctly defined

// Sign-up route
router.post('/signup', async (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    console.log( { name, email, password, dateOfBirth } = req.body)

    // Trim the inputs
    name = name ? name.trim() : "";
    email = email ? email.trim() : "";
    password = password ? password.trim() : "";
    dateOfBirth = dateOfBirth ? dateOfBirth.trim() : "";

    // Input validation
    if (!name || !email || !password || !dateOfBirth) {
        return res.json({
            status: "Failed",
            message: "Empty input fields"
        });
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        return res.json({
            status: "Failed",
            message: "Invalid name entered"
        });
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
        return res.json({
            status: "Failed",
            message: "Please input a proper email"
        });
    
    } else if (isNaN(new Date(dateOfBirth).getTime())) {
        return res.json({
            status: "Failed",
            message: "Please input a valid date"
        });
    } else if (password.length < 8) {
        return res.json({
            status: "Failed",
            message: "Password must be at least 8 characters"
        });
    } else {
        try {
            // Check if the user already exists
            const existingUser = await User.find({ email });
            if (existingUser.length > 0) {
                return res.json({
                    status: "Failed",
                    message: "User credentials already exist"
                });
            }

            // Hash the password and create a new user
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth
            });

            const result = await newUser.save();
            return res.json({
                status: "Success",
                message: "User successfully registered",
                data: result
            });

        } catch (err) {
            console.error(err);
            return res.json({
                status: "Failed",
                message: "An error occurred during registration"
            });
        }
    }
});

// Sign-in route (placeholder)
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    email = email ? email.trim() : "";
    password = password ? password.trim() : "";

    if (email === "" || password === "") {
        return res.json({
            status: "Failed",
            message: "The input credentials shall not be empty, please try again"
        });
    } 

    try {
        const user = await User.find({ email });
        
        if (!user.length) {
            return res.json({
                status: "Failed",
                message: "User not found, please try again"
            });
        }

        const hashedPassword = user[0].password;

        // Compare password
        bcrypt.compare(password, hashedPassword).then((match) => {
            if (match) {
                const data = { /* Define data here, e.g., user information */ };
                return res.json({
                    status: "Success",
                    message: "User Login Success",
                    data: user
                });
            } else {
                return res.json({
                    status: "Failed",
                    message: "Invalid password, please try again"
                });
            }
        }).catch(err => {
            return res.json({
                status: "Failed",
                message: "Error occurred during password comparison"
            });
        });
        
    } catch (error) {
        return res.json({
            status: "Failed",
            message: "Something went wrong while checking for existing user"
        });
    }
});


module.exports = router;
