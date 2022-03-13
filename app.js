const sql = require('mysql');
const table = require('console.table')
const ifind = require('inquirer');

const connect = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'apples747',
    database: 'yours'
})

connect.connect(function(err){
    if (err) throw err;
    options();
})

function options() {
    ifind
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome, what do you need?',
            choices: [
                    'all of the employees',
                    'all of the departments',
                    'all of the roles',
                    'Add someone as an employee',
                    'Add your department',
                    'Add a new role',
                    'Enter an employees role',
                    'Delete an employee from the base',
                    'Done'
                    ]
            }).then(function (answer) {
                switch (answer.action) {
                    case 'all of the employees':
                        employee();
                        break;
                    case 'all of the departments':
                        departments();
                        break;
                    case 'all of the roles':
                        roles();
                        break;
                    case 'Add someone as an employee':
                        employee();
                        break;
                    case 'Add your department':
                        department();
                        break;
                    case 'Add a new role':
                        role();
                        break;
                    case 'Enter an employee role':
                        newRole();
                        break;
                    case 'Delete an employee from the base':
                        removeEmployee();
                        break;
                    case 'done': 
                        done();
                        break;
                    default:
                        break;
                }
        })
};
function employee() {
    var query = 'SELECT * FROM employee';
    connect.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        options();
    })
};

function departments() {
    var query = 'SELECT * FROM department';
    connect.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

function roles() {
    var query = 'SELECT * FROM role';
    connect.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

function employee() {
    connect.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        ifind
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connect.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        options();
                    })
                })
        })
};
function department() {
    ifind
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connect.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connect.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                options();
                })
            })
};
function role() {
    connect.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        ifind 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connect.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

function newRole() {

};
function removeEmployee() {

};
function done() {
    connect.end();
};
