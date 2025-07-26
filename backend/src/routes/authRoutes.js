const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validInfo = require('../middleware/validInfo');
const authorization = require("../middleware/authorization")

router.post('/register', validInfo, authController.register);
router.post('/login', validInfo, authController.login);
router.get("/is-verify", authorization, authController.authorize);

module.exports = router;