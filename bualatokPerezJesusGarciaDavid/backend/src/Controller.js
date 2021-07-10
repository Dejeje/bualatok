const mysql = require('mysql');
var conn = mysql.createConnection(
    {
        host: 'localhost:3306',
        user: 'root',
        password: 'root',
        database: 'daweb'
    }
);

conn.connect(function (error) {
    if (error) {
        console.log('The database cannot be reached');
    }
})

exports.addUser = function(user) {
    conn.query('inser into user set ?', user, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
    })
}