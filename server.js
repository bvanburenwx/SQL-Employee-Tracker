const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promiseMysql = require("promise-mysql");
const { allowedNodeEnvironmentFlags } = require("process");
const { type } = require("os");
const { connect } = require("http2");

// Connect to mysql database
const connectionInfo = {
  host: "localhost",
  // MySQL username
  user: "root",
  // MySQL password
  password: "password",
  database: "employee_db",
  port: 3306,
};

const db = mysql.createConnection(connectionInfo);

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
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "Add Employee?",
          "Update Employee Role",
          "View All Roles?",
          "Add Role?",
          "View all Departments",
          "Add Department?",
          "Exit",
        ],
      },
    ])
    .then((value) => {
      // check if the question matches then call the function
      switch (value.choice) {
        case "View All Employees?":
          viewAllEmployees();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles?":
          viewAllRoles();
          break;

        case "Add Role?":
          addRole();
          break;

        case "View all Departments":
          viewAllDepartments();
          break;

        case "Add Department?":
          addDepartment();
          break;
        // added Exit function
        case "Exit":
          db.end();
          console.log("Bye");
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
      console.table(results);
      start();
    }
  );
}

function viewAllRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary FROM role",
    (err, results) => {
      if (err) {
        throw err;
      }
      console.table(results);
      start();
    }
  );
}

function viewAllDepartments() {
  db.query(
    "SELECT department.id, department.name AS 'Department Name' FROM department",
    (err, results) => {
      if (err) {
        throw err;
      }
      console.table(results);
      start();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Add Department:",
      },
    ])
    .then((results) => {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: results.department,
        },
        (err, results) => {
          if (err) throw err;
          console.log("Department added");
          start();
        }
      );
    });
}

function addEmployee() {
  var managerArr = [];
  var empRoleArr = [];

  db.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, results) => {
      results.map((manager) =>
        managerArr.push(`${manager.first_name} ${manager.last_name}`)
      );
      return managerArr;
    }
  );

  db.query("SELECT * FROM role ", (err, results) => {
    if (err) throw err;
    results.map((role) => empRoleArr.push(`${role.title}`));
    return empRoleArr;
  });

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role",
        choices: empRoleArr,
      },
      {
        type: "list",
        name: "manager",
        message: "What is the name of the employees manager?",
        choices: managerArr,
      },
    ])
    .then((results => {
      const role_id = empRoleArr.indexOf(results.role) + 1;
      const manager_id = managerArr.indexOf(results.manager) + 1;

      const newEmployee = {
        first_name: results.first_name,
        last_name: results.last_name,
        manager_id: manager_id,
        role_id: role_id,
      };

      db.query(
        "INSERT INTO employee SET ?",
        newEmployee, 
        err => {
          if (err) throw err;
          console.log("Employee added");
          start();
        }
      );
    })
  );
}
