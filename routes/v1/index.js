const router = require("express").Router();
const restrict = require("../../middlewares/auth.middlewares");

const userController = require("../../controllers/v1/userController.js");
router.post("/users", userController.store);
router.get("/users", restrict, userController.index);
router.get("/users/:id", restrict, userController.show);

const accountController = require("../../controllers/v1/accountController.js");
router.post("/accounts", restrict, accountController.register);
router.get("/accounts", restrict, accountController.index);
router.get("/accounts/:id", restrict, accountController.show);

const transactionController = require("../../controllers/v1/transactionControllers.js");
router.post("/transactions", restrict, transactionController.store);
router.get("/transactions", restrict, transactionController.index);
router.get("/transactions/:id", restrict, transactionController.show);

const authController = require("../../controllers/v1/authController.js");
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/authenticate", restrict, authController.auth);

module.exports = router;
