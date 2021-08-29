const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

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
                message: 'You are connected to the employee database, What would you like to do?',
                name: 'option',
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
        ]) .then(value => {
            switch (value.option) {
                case 'View all employees?':
                    viewEmployees();
                break;
                case 'Add Employee?':
                    addEmployee();
                break;
                case 'Update Employee Role?':
                    updateEmployeeRole();
                break;
                case 'View all Roles?':
                    viewAllRoles();
                break;
                case 'Add Role?':
                    addRole();
                case 'View all Departments?':
                    viewDepartments();
                break;
                case 'Add Department':
                    addDepartment();
                case 'Exit':
                    db.end();
                    console.log('Thanks!');
                    break;
            }
        });
}
