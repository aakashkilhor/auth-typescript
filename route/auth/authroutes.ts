const express = require('express')
const { register, home, login, dashboard } = require('../../controllers/authcontrollers') 

// Import Middleware in this file
const auth = require("../../middleware/auth")

const router = express.Router();

router.get("/", home)
router.post("/register", register)
router.post("/login", login)
router.get("/dashboard", auth, dashboard)

// module.exports = router;
export default router;