const express = require('express');
const { addUser, getUser } = require('../src/Controller');

var router = express.Router();

router.post('/register', async function(req, res) {
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let username = req.body.username.toString();
    let password = req.body.password.toString();
    let email = req.body.email.toString();
    let credit = parseInt(req.body.credit.toString());
    let province = req.body.province.toString();

    const inserted = await addUser(name, surname, username, password, credit, province, email);

    if (inserted === true) {
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

router.put('/login', async function(req, res) {
    let username = req.body.username.toString();
    let password = req.body.password.toString();

    var user = await getUser(username, password);

    if (user === null)
        res.sendStatus(401);
    else {
        res.status(200).json(user);
    }
});

module.exports = router;
