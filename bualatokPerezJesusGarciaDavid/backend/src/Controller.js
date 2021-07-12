const mysql = require('mysql');
const User = require('../../src/User');
var conn = mysql.createConnection(
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

exports.addUser = function(user) {
    conn.query('insert into user set ?', user, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
    })
}

exports.getUser = async function(username, password) {
    const data = await getUserFromDb(username, password);
    
    if (password === data.password)
        return new User(data.name, data.surname, data.username, data.password, data.credit, data.province, data.email);
    
    return null;
}

function getUserFromDb(username, password) {
    return new Promise(data => {
        conn.query('select * from user where username = ?', username, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                data(result[0]);
            } catch(error) {
                data({});
                throw error;
            }
        })
    })
}
