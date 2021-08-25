INSERT INTO departments (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (id, department_id, title, salary)
VALUES  (1, 1, 'Sales Lead', 100000),
        (2, 1, 'Salesperson', 80000),
        (3, 2, 'Lead Engineer', 150000),
        (4, 2, 'Software Engineer', 120000),
        (5, 3, 'Account Manager', 160000),
        (6, 3, 'Accountant', 125000),
        (7, 4, 'Legal Team Lead', 250000),
        (8, 4, 'Lawyer', 190000);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'John', 'Doe', 1, NULL),
        (2, 'Mike', 'Chan', 2, 3),
        (3, 'Ashley', 'Rodriguez', 3, NULL),
        (4, 'Kevin', 'Tupik', 4, 4),
        (5, 'Kunal', 'Singh', 5, NULL),
        (6, 'Malia', 'Brown', 6, 5),
        (7, 'Sarah', 'Lourd', 7, NULL),
        (8, 'Tom', 'Allen', 8, 6);