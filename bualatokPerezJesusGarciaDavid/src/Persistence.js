const mysql = require('mysql');

var currentUser;

const conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'daweb'
    }
);

conn.connect(function (error) {
    if (error) {
        throw error;
    }
})

exports.addUser = async function(name, surname, username, password, credit, province, email) {
    const inserted = await insertUser({ "name": name, "surname": surname, "username": username, "password": password, "credit": credit, "province": province, "email": email});

    return inserted;
}

exports.getUser = async function(username, password) {
    const data = await getUserFromDb(username);
    if (data !== undefined)
        if (password === data.password)
            return data;
    
    return null;
}

function getUserFromDb(username) {
    return new Promise(data => {
        conn.query('select * from user where username = ?', username, function (error, result) {
            if (error) {
                data({});
                console.log(error);
            } else {
                try {
                    data(result[0]);
                } catch(error) {
                    data({});
                    console.log(error);
                }
            }
        })
    })
}

function insertUser(data) {
    return new Promise(inserted => {
        conn.query('insert into user set ?', data, function (error, result) {
            if (error) {
                inserted(false);
                console.log(error);
            } else {
                try {
                    inserted(true);
                } catch(error) {
                    inserted(false);
                    console.log(error);
                }
            }
        })
    })
}

exports.addProduct = async function(name, price, description, photo, date, category, state) {
    const product = new Product(name, price, description, photo, date, category, state);

    const inserted = await insertProduct(product);

    return inserted;
}

function insertProduct(product) {
    return new Promise(inserted => {
        conn.query('insert into product set ?', product, function (error, result) {
            if (error) {
                inserted(false);
                console.log(error);
            } else {
                try {
                    inserted(true);
                } catch(error) {
                    inserted(false);
                    console.log(error);
                }
            }
        })
    })
}
