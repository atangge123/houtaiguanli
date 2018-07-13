var express = require('express');
var router = express.Router();
var UserController=require("../controllers/UserController");
//  GET users listing
router.get('/register',UserController.register);
router.post("/login",UserController.login);
router.get("/check",UserController.check);
router.get("/loginout",UserController.loginout);
module.exports = router;
