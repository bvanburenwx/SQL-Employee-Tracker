const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");

// Connect to mysql database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "password",
    database: "employee_db",
    port: 3306,
  },
  console.log(`Connected to the employee_db database`)
);

// Throw an error if the database is not connected
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Your database is now connected");
  start();
});

// Use inquirer to set up the original prompt questions function
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message:
          "You are connected to the employee database, What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "Add Employees?",
          "Update Employee Role?",
          "View All Roles?",
          "Add Role?",
          "View All Departments?",
          "Add Department?",
          "Exit",
        ],
      },
    ])
    .then(value => {
      switch (value.choice) {
        case "View all employees?":
          viewAllEmployees();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Update Employee Role?":
          updateEmployeeRole();
          break;

        case "View all Roles?":
          viewAllRoles();
          break;

        case "Add Role?":
          addRole();
          break;

        case "View all Departments?":
          viewDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;
          
        case "Exit":
          db.end();
          console.log("Thanks!");
          break;
      }
    });
}

function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    (err, results) => {
      if (err) {
        throw err;
      }
      consoleTable(results);
      start();
    }
  );
}