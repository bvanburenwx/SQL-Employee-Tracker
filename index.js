const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employee_db',
        port: 3306,
    },
    console.log(`Connected to the employee_db database`)
);

// Throw an error if the database is not connected 
db.connect(err => {
    if(err) {
        throw err;
    }
    console.log("Your database is now connected");
});