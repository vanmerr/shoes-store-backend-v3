const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.get("/email/:email", userController.getUserByEmail.bind(userController));
router.get("/phone/:phone", userController.getUserByPhone.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

module.exports = router;