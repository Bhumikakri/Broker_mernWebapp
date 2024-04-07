const express = require("express");

const routes = express.Router();

const propertyController = require("../Controller/property");
const authmiddleware = require("../middleware/auth");


routes.post("/create", authmiddleware(["seller"]), propertyController.addProperties);
routes.get('/get/:id', authmiddleware(["seller", "buyer"]), propertyController.getProperty);
routes.patch("/update/:id", authmiddleware(["seller"]), propertyController.updateProperty);
routes.delete("/delete/:id", authmiddleware(["seller"]), propertyController.deleteProperty);
routes.get('/get', authmiddleware(["seller", "buyer"]), propertyController.getsearchProperties);


module.exports = routes ;