const express = require('express');
const User = require('../../src/User');
const { addUser, getUser } = require('../src/Controller');

var router = express.Router();

router.post('/register', function(req, res) {
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let username = req.body.username.toString();
    let password = req.body.password.toString();
    let email = req.body.email.toString();
    let credit = parseInt(req.body.credit.toString());
    let province = req.body.province.toString();
    
    var newUser = new User(name, surname, username, password, credit, province, email);

    addUser(newUser);

    res.send('Ok');
});

router.put('/login', async function(req, res) {
    let username = req.body.username.toString();
    let password = req.body.password.toString();

    var user = await getUser(username, password);

    if (user === null)
        res.send('Not found');
    else
        res.send(user);
});

module.exports = router;
