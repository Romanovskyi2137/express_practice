const Router = require("express");
const router = new Router();
const authController = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require("./authMiddleware");
const roleMiddleware = require("./roleMiddleware");


router.post("/registration", [
    check("username", "username could not bbe empty").notEmpty(),
    check("password", "password needs 6-12 symbols").isLength({min: 6, max: 12})
], authController.registration);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(["USER"]), authController.getUsers);



module.exports = router;