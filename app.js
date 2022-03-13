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
        console.log(res.length + ' someones here');
        console.table('Everyone', res); 
        options();
    })
};

function departments() {
    var query = 'SELECT * FROM department';
    connect.query(query, function(err, res) {
        if(err)throw err;
        console.table('Every Department', res);
        options();
    })
};

function roles() {
    var query = 'SELECT * FROM role';
    connect.query(query, function(err, res){
        if (err) throw err;
        console.table('Every Role:', res);
        options();
    })
};

function employee() {
    connect.query('SELECT * FROM the role', function (err, res) {
        if (err) throw err;
        ifind
            .prompt([
                {
                    name: 'first',
                    type: 'input', 
                    message: "Whats their first name ",
                },
                {
                    name: 'last',
                    type: 'input', 
                    message: "Whats their last "
                },
                {
                    name: 'ID',
                    type: 'input', 
                    message: "Enter manager ID "
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
                    message: "What is their role in the company  "
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
                        console.log('This employee has been added to the base');
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
                message: 'which department is needed '
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
                console.log('Your department is now added ');
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
                message: "What role do you wish to add "
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is that salary for this new position enter here'
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
                    console.log('Your role is now available');
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
