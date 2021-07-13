const mysql = require('mysql');
const User = require('../../src/User');

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
    const user = new User(name, surname, username, password, credit, province, email);

    const inserted = await insertUser(user);

    return inserted;
}

exports.getUser = async function(username, password) {
    const data = await getUserFromDb(username);
    
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

function insertUser(user) {
    return new Promise(inserted => {
        conn.query('insert into user set ?', user, function (error, result) {
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
