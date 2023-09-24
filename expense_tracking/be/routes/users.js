var express = require("express");
const user = require("../models/Controller/user");
// const profile = require("../models/Controller/profile");
const { validate } = require("../config/jwtConfig");
var router = express.Router();

/* GET users listing. */
router.post("/signup", user.create);

router.post("/login", user.login);
router.get("/validate", validate, user.validateUser);



module.exports = router;
