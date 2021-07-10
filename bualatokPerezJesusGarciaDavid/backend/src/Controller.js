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