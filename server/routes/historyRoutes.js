const express = require("express")
const router = express.Router()
const {  
    addHistory,
    getUserHistory,
    deleteHistory,
    clearAllHistory
} = require("../controllers/historyController");
const protect = require('../middleware/authMiddleware')

router.post("/", protect, addHistory)
router.get("/", protect, getUserHistory)
router.delete("/:id", protect, deleteHistory)
router.delete("/", protect, clearAllHistory)

module.exports = router