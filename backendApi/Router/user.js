const express = require("express");

const router = express.Router();

const userController = require("../Controller/user");

router.post("/register",userController.register);

router.get("/signin",userController.login);

router.post('/google', userController.google);

router.get('/signout', userController.signOut);


module.exports = router;