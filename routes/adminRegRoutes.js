const express = require('express');
const router = express.Router();

// Import model
const AdminRegister = require('../models/AdminRegister');

router.get('/adminReg', (req, res) => {
    res.render('register')
});

router.post('/adminReg', async (req, res) => {
    try {
        const admin = new AdminRegister(req.body);
        console.log(req.body)
        await AdminRegister.register(
            admin, 
            req.body.password,
            (err) => {
                if(err){
                    throw err;
                }
                res.redirect('/adminReg')
            }
        );

    } catch (error) {
        req.status(400).send('Sorry something went wrong')
    }
});

module.exports = router;