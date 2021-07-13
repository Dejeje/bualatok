const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/upload/images'});
var fs = require('file-saver');
const { addUser, getUser, addProduct } = require('../src/Persistence');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('login.html');
})

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

router.post('/login', async function(req, res) {
    let username = req.body.username.toString();
    let password = req.body.password.toString();

    var user = await getUser(username, password);

    if (user === null)
        res.sendStatus(401);
    else {
        res.status(200).json(user);
    }
});

router.post('/registerProduct', async function(req, res) {
    let name = req.body.name.toString();
    let description = req.body.description.toString();
    let price = parseInt(req.body.price.toString());
    let category = req.body.category.toString();
    let state = req.body.state.toString();
    let date = req.body.date.toString();

    const inserted = await addProduct(name, price, description, date, category, state);

    if (inserted === true) {
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

router.post('/uploadPhoto', upload.single('photo'), (req, res) => {
    const photo = req.body;
    console.log(photo);
    let path = `../upload/images/${photo.name}`;
    console.log(path);
    fs.saveAs(photo, path);

    res.status(200).send(path);
})

module.exports = router;