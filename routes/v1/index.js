const router = require("express").Router();

// Auth Middleware
function auth(req, res, next) {
  let { authorization } = req.headers;

  if (authorization) {
    let token = authorization.split(" ")[1];

    if (token) {
      return next();
    }
  }

  return res.status(401).json({
    status: false,
    message: "You're not authorized!",
    data: null,
  });
}

const userController = require("../../controllers/v1/userController.js");
router.post("/users", auth, userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);

const accountController = require("../../controllers/v1/accountController.js");
router.post("/accounts", accountController.register);
router.get("/accounts", accountController.index);
router.get("/accounts/:id", accountController.show);

const transactionController = require("../../controllers/v1/transactionControllers.js");
router.post("/transactions", transactionController.store);
router.get("/transactions", transactionController.index);
router.get("/transactions/:id", transactionController.show);

module.exports = router;
