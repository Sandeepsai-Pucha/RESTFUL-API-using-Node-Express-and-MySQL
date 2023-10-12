module.exports = app => {
    const employees = require("../controllers/emp.controller");
  
    const router = require("express").Router();
  
    // Create a new Employee
    router.post("/", employees.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", employees.findOne);

    // Retrieve all employees
    router.get("/", employees.findAll);
  
    // Update a Tutorial with id
    router.put("/:id", employees.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", employees.delete);
  
    // Delete all employees
    router.delete("/", employees.deleteAll);
  
    app.use('/api/employees', router);
  };