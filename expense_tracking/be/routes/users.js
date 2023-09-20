var express = require("express");
const user = require("../models/Controller/user");
// const profile = require("../models/Controller/profile");
const { validate } = require("../config/jwtConfig");
var router = express.Router();

/* GET users listing. */
router.post("/signup", user.create);

router.post("/login", user.login);
router.get("/validate", validate, user.validateUser);

// router.get("/validate", validate);
// router.get("/profile/get/:email", profile.getProfileData);
// router.post("/profile", profile.profileCreate);
// router.get("/get_all_manager", user.managerList);
// router.get("/get_all_employee", user.employeeList);
// router.put("/profile_update", profile.profileUpdate);

module.exports = router;
