const express = require("express")
const router = express.Router()

const { convertTTS } = require("../controllers/ttsController")
const { listVoices } = require("../controllers/ttsController")

router.post("/convert", convertTTS)
router.get("/voices", listVoices)

module.exports = router