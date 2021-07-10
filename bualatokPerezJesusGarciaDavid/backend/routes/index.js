const express = require('express');
const User = require('../../src/User');
const { addUser } = require('../src/Controller');

var router = express.Router();

router.post('/register', function(req, res, next) {
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let user = req.body.user.toString();
    let password = req.body.password.toString();
    let email = req.body.email.toString();
    let credit = parseInt(req.body.credit.toString());
    
    var newUser = new User(name, surname, user, password, credit, 'provincia', email);

    addUser(newUser);

    res.send('Ok');
});

module.exports = router;
