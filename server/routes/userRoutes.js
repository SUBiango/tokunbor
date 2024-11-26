const express = require("express")
const router = express.Router()
const {  
    authUser,
    registerUser,
    logoutUser, 
    getUserProfile,
    updateUserProfile,
    deleteUser
} = require("../controllers/userController");
const protect = require('../middleware/authMiddleware')

router.post("/", registerUser)
router.post("/auth", authUser)
router.post("/logout", logoutUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)
router.delete("/profile", protect, deleteUser)

module.exports = router