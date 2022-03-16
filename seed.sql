USE DBemployee;

INSERT INTO department (name)
VALUES 
('Production'),
('Home Office'),
('Creative'),
('Camera'),
('Marketing'),
('HR');

INSERT INTO roles (title, salary, department_id)
VALUES
('Production Assistant', 40000, 10),
('Production Manager', 120000, 3),
('Creative Specialist', 55000, 5),
('Ideas', 55000, 10),
('HR Assistant', 75000, 3),
('Personal Assistant', 40000, 5);

INSERT INTO employee (first, last, role, ID)
VALUES 
('John', 'Smith', 1, 458),
('Ronald', 'Young', 2, 276),
('David', 'Miller', 3, 486),
('Maria', 'Hall', 4, 126),
('Linda', 'Martin', 5, 724),
('Taylor', 'Wilson', 6, 157);