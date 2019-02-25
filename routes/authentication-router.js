const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const router = express.Router();

router.post('/register', (req, res) => {
    try {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);
    
        db('users')
            .insert(user)
            .then(id => {
                res.status(201).json(id)
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request, username is taken or required fields arent filled",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not create user",
            error
        })
    }
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    db('users')
        .where({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({ message: `Welcome ${user.username}` })
            }else{
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not login",
                error
            })
        })

});

router.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.send(500).json({
                message: "Server could not get users",
                error
            })
        })
});

module.exports = router;