const mysql = require('mysql');
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

exports.getUser = function(user, password) {
    conn.query('select * from user where user = ?', user, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        
        if (result.password === password)
            return new User(result.name, result.surname, result.user, result.password, result.credit, result.province, result.email);

        return null;
    })
}
