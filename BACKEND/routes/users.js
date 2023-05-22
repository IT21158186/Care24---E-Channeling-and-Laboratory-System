const express = require('express');
const jwt = require('jsonwebtoken');
const swal = require('sweetalert');
const Users = require('../models/users');

const router = express.Router();

//admin


//add new user
router.post('/users/add', (req, res) => {

    let newUsers = new Users(req.body);

    newUsers.save((err) => {

        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(201).json({
            success: "New User Created Successfully"
        });
    });
});



//view user
router.get('/users', (req, res) => {

    Users.find().exec((err, users) => {

        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingUsers: users
        });
    });
});


//view specific user
router.get("/users/:id", (req, res) => {

    let userId = req.params.id;

    Users.findById(userId, (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    });
});


//update user
router.put('/users/update/:id', (req, res) => {

    Users.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, user) => {

            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Updated Successfully"
            });
        }
    );
});


//delete user
router.delete('/user/delete/:id', (req, res) => {

    Users.findByIdAndRemove(req.params.id).exec(

        (err, deletedUser) => {

            if (err) return res.status(400).json({
                message: "Delete Unsuccessful",
                err
            });

            return res.json({
                message: "Delete Successful",
                deletedUser
            });
        });
});



//loginRegister

// Register a new user
/*
router.post('/users/register', async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Check if the user already exists
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        user = new Users(req.body);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const token = user.generateAuthToken();

        return res.status(201).json({ success: 'User registered successfully', token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
*/


//login function
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            swal('Invalid Email', 'Please enter a valid email.', 'error');
            return res.status(401).json({ error: 'Invalid Email' });
        }

        // Compare the password
        if (password !== user.password) {
            swal('Invalid Password', 'Please enter a valid password.', 'error');
            return res.status(401).json({ error: 'Invalid Password' });
        }

        // Generate a JWT token
        const token = user.generateAuthToken();

        swal('Success', 'User logged in successfully', 'success');
        return res.status(200).json({ success: 'User logged in successfully', userType: user.userType, token });
    } catch (error) {
        swal('Server Error', 'An error occurred on the server.', 'error');
        return res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;