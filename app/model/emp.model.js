const sql = require('./db')

const Employee = function(employee) {
    this.emp_name = employee.emp_name,
    this.emp_address = employee.emp_address,
    this.emp_salary = employee.emp_salary
};


Employee.create = (newEmployee, result) => {
    sql.query("INSERT INTO employees SET ?", newEmployee, (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
  
      console.log("created employee: ", { emp_id: response.insertId, ...newEmployee });
      result(null, { emp_id: response.insertId, ...newEmployee });
    });
};

Employee.findById = (emp_id, result) => {
    sql.query(`SELECT * FROM employees WHERE emp_id = ${emp_id}`, (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
  
      if (response.length) {
        console.log("found employee: ", response[0]);
        result(null, response[0]);
        return;
      }
  
      // not found employee with the id
      result({ kind: "not_found" }, null);
    });
};

Employee.getAll = (emp_name, result) => {
    let query = "SELECT * FROM employees";
  
    if (emp_name) {
      query += ` WHERE emp_name LIKE '%${emp_name}%'`;
    }
  
    sql.query(query, (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
  
      console.log("employees: ", response);
      result(null, response);
    });
};

Employee.updateById = (emp_id, employee, result) => {
    sql.query(
      "UPDATE employees SET emp_name = ?, emp_address = ?, emp_salary = ? WHERE emp_id = ?",
      [employee.emp_name, employee.emp_address, employee.emp_salary, emp_id],
      (error, response) => {
        if (error) {
          console.log("error: ", error);
          result(null, error);
          return;
        }
  
        if (response.affectedRows == 0) {
          // not found employee with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated employee: ", { emp_id: emp_id, ...employee });
        result(null, { emp_id: emp_id, ...employee });
      }
    );
};

Employee.remove = (emp_id, result) => {
    sql.query("DELETE FROM employees WHERE emp_id = ?", emp_id, (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
  
      if (response.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted employee with id: ", emp_id);
      result(null, response);
    });
};
  
Employee.removeAll = result => {
    sql.query("DELETE FROM employees", (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
  
      console.log(`deleted ${response.affectedRows} employees`);
      result(null, response);
    });
};
  
module.exports = Employee;