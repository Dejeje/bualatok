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

exports.getProductsByFilter = async function(text, minPrice, maxPrice, category, state) {
    const data = await getProductsByFilter(text, minPrice, maxPrice, category, state);
    if (data !== undefined)
        return data;
    
    return null;
}

exports.getUserProducts = async function(owner) {
    const data = await getUserProducts(owner);

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

function getProductsByFilter(text, minPrice, maxPrice, category, state) {
    var query = 'select * from product ';
    var params = new Array();
    var various = false;
    
    if (text !== '' || minPrice !== '' || maxPrice !== '' || category !== '' || state !== '')
        query += 'where ';

    if (text !== '') {
        query += 'text like ? or description like ? ';
        params.push(text);
        params.push(text);
        various = true;
    }

    if (minPrice !== '') {
        if (various === true) {
            query += 'and ';
        }
        params.push(minPrice);
        query += 'price >= ? ';
        various = true;
    }
    if (maxPrice !== '') {
        if (various === true) {
            query += 'and ';
        }
        params.push(maxPrice);
        query += 'price <= ? ';
        various = true;
    }
    if (category !== '') {
        if (various === true) {
            query += 'and ';
        }
        params.push(category);
        query += 'category = ? ';
        various = true;
    }
    if (state !== '') {
        if (various === true) {
            query += 'and ';
        }
        params.push(state);
        query += 'state = ? ';
    }

    return new Promise(data => {
        conn.query(query, params, function (error, result) {
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


function getUserProducts(owner) {
    return new Promise(data => {
        conn.query('select * from product where owner = ?', owner, function (error, result) {
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
