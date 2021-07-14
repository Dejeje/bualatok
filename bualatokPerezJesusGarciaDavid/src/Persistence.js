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

exports.addProduct = async function(name, price, description, date, category, state, owner) {
    const inserted = await insertProduct({"name": name, "price": price, "description": description, "date": date, "category": category, "state": state, "owner": owner, "timesSeen": 0});

    return inserted;
}

exports.editUser = async function(name, surname, username, password, credit, province, email) {
    const inserted = await editUser({ "name": name, "surname": surname, "username": username, "password": password, "credit": credit, "province": province, "email": email});

    return inserted;
}

exports.getProducts = async function() {
    const data = await getProductsFromDb();
    if (data !== undefined)
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

function insertProduct(data) {
    return new Promise(inserted => {
        conn.query('insert into product set ?', data, function (error, result) {
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

//TODO falta arreglar sql para editar
function editUser(data) {
    return new Promise(inserted => {
        conn.query('UPDATE user SET ? WHERE username = ? ', [data, data.username], function (error, result) {
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

function getProductsFromDb() {
    return new Promise(data => {
        conn.query('select * from product', function (error, result) {
            if (error) {
                data({});
                console.log(error);
            } else {
                try {
                    data(result);
                } catch(error) {
                    data({});
                    console.log(error);
                }
            }
        })
    })
}


