const express = require("express");
const authmiddleware = require("../middleware/auth")

const router = express.Router();

const userController = require("../Controller/user");

router.post("/register",userController.register);

router.post("/signin",userController.login);

router.post('/google', userController.google);

router.get('/signout', userController.signOut);

router.post('/update', authmiddleware(["seller","buyer"]),userController.updateUser);

router.delete('/delete', authmiddleware(["seller","buyer"]),userController.deleteUser);

router.get('/:id', authmiddleware(["seller","buyer"]),userController.getUser);


module.exports = router;