using app.Employees from '../db/Employees';

service Employees_Service {
   entity Employee as projection on Employees.Employee;
}