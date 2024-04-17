const { getUsers, saveUser, getUserById } = require("../controller/usuario.controller.js");

const Router = require("express").Router;
const router = Router(); 

router.get("/", getUsers);
router.post("/", saveUser);
router.get("/:uid", getUserById);

module.exports = router; 

