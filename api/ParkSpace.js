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

    console.log(req.body)
});


module.exports = router;