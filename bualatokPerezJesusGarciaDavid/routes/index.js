const express = require('express');
const { addUser, getUser, addProduct, getProducts, editUser, getUserProducts } = require('../src/Persistence');

var router = express.Router();
var currentUser;

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
        currentUser = user;
        res.sendStatus(200);
    }
});

router.post('/registerProduct', async function(req, res) {
    let name = req.body.name.toString();
    let description = req.body.description.toString();
    let price = parseInt(req.body.price.toString());
    let category = req.body.category.toString();
    let state = req.body.state.toString();
    let date = req.body.date.toString();
    let owner = currentUser.username;

    const inserted = await addProduct(name, price, description, date, category, state, owner);

    if (inserted === true) {
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

router.post('/editUser', async function(req, res) {
    let name = req.body.name.toString();
    let surname = req.body.surname.toString();
    let username = req.body.username.toString();
    let password = req.body.password.toString();
    let email = req.body.email.toString();
    let credit = parseInt(req.body.credit.toString());
    let province = req.body.province.toString();

    currentUser.name = name;
    currentUser.surname = namsurnamee;
    currentUser.password = password;
    currentUser.email = email;
    currentUser.credit = credit;
    currentUser.province = province;

    const inserted = await editUser(name, surname, username, password, credit, province, email);

    if (inserted === true) {
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
});

router.get('/getUser', function(req, res) {
    if (currentUser !== undefined)
        res.status(200).json(currentUser);
    else
        res.sendStatus(404);
});

router.get('/getProducts', async function(req, res) {
    let products = await getProducts();
    
    if (products !== undefined)
        res.status(200).json(products);
    else
        res.sendStatus(404);
});

router.get('/getProducts', async function(req, res) {
    const data = await getUserProducts(currentUser.username);
    if (data !== null)
        res.status(200).json(data);
    else
        res.sendStatus(404);
})
module.exports = router;
