const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const UserVerification = require('../models/UserVerification');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const path = require('path')

router.post('/parkSpace', async (req, res) => {
    let {  park_number,availability,ModTime } = req.body;
    try {
        console.log(req.body)
        return res.status(200).json({
            status: "Success",
            message: `Slot Availability Modified`
        });
        
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: `Slot Availability Modification Failed`
        });
        
    }

    console.log(req.body)
});
router.post('/rfid_card_', async (req, res) => {
    let { UID } = req.body;
    try {
        console.log(req.body)
        return res.status(200).json({
            status: "Success - UID RECEIVED",
            message: `${UID}`
        });
        
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: `Error has occurred in UID UPLOAD`
        });
        
    }

    console.log(req.body)
});


module.exports = router;