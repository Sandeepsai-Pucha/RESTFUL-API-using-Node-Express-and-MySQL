const Employee = require('../model/emp.model')

exports.create = (request, response) => {
    
    // Validating  request
    if (!request.body) {
      response.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Creating an Employee
    const employee = new Employee({
      emp_name: request.body.emp_name,
      emp_address: request.body.emp_address,
      emp_salary: request.body.emp_salary
    });
  
    // Saving Employee in the database
    Employee.create(employee, (error, data) => {
      if (error) {
        response.status(500).send({
            message:
              error.message || "Some error occurred while creating an Employee Details."
          });
      }
      else response.send(data);
    });
};

exports.findOne = (request, response) => {

    Employee.findById(request.params.id, (error, data) => {
      if (error) {
        if (error.kind === "not_found") {
          response.status(404).send({
            message: `Not found Employee with id ${request.params.id}.`
          });
        } else {
          response.status(500).send({
            message: "Error retrieving Employee with id " + request.params.id
          });
        }
      } else response.send(data);
    });
};

exports.findAll = (request, response) => {
    const emp_name = request.query.emp_name;
  
    Employee.getAll(emp_name, (error, data) => {
      if (error)
        response.status(500).send({
          message:
            error.message || "Some error occurred while retrieving employees."
        });
      else response.send(data);
    });
};

exports.update = (request, response) => {
    
    // Validate Request
    if (!request.body) {
      response.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(request.body);
  
    Employee.updateById(
      request.params.id,
      new Employee(request.body),
      (error, data) => {
        if (error) {
          if (error.kind === "not_found") {
            response.status(404).send({
              message: `Not found Employee with id ${request.params.id}.`
            });
          } else {
            response.status(500).send({
              message: "Error updating Employee with id " + request.params.id
            });
          }
        } else response.send(data);
      }
    );
};

exports.delete = (request, response) => {
    Employee.remove(request.params.id, (error, data) => {
      if (error) {
        if (error.kind === "not_found") {
          response.status(404).send({
            message: `Not found Employee with id ${request.params.id}.`
          });
        } else {
          response.status(500).send({
            message: "Could not delete Employee with id " + request.params.id
          });
        }
      } else response.send({ message: `Employee was deleted successfully!` });
    });
};

exports.deleteAll = (request, response) => {
    Employee.removeAll((error, data) => {
      if (error) {
        response.status(500).send({
            message:
              error.message || "Some error occurred while removing all employees."
          });
      }

      else response.send({ message: `All Employee Details were deleted successfully!` });
    });
};