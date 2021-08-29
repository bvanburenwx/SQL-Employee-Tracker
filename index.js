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