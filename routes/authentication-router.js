const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const session = require('express-session');
const KnexConnectSession = require('connect-session-knex')(session);

const router = express.Router();

const sessionConfig = {
    name: 'Session',
    secret: 'Some Secret',
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,

    store: new KnexConnectSession({
        knex: db,
        sidfieldname: 'sid',
        tablename: 'session',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

router.use(session(sessionConfig));

const restricted = (req,res,next) => {
    if(req.session && req.session.user){
        next();
    }else{
        res.status(401).json({
            message: "You are unauthorized to do this"
        })
    }
}

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
                req.session.user = user
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

router.get('/users', restricted,(req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get users",
                error
            })
        })
});

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(400).json({ message: 'You cant logout', error })
            }else{
                res.status(200).json({ message: 'You have been logged out' })
            }
        });
    }else{
        res.status(404).json({
            message: 'You cannot log out if you are not logged in.'
        })
    }
});

module.exports = router;