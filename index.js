const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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

// Use inquirer to set up the original prompt questions function
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'Option',
                options: [
                    'View All Employees?',
                    'Add Employees?',
                    'Update Employee Role?',
                    'View All Roles?',
                    'Add Role?',
                    'View All Departments?',
                    'Add Department?',
                    'Exit',
                ],
            },
        ])
}