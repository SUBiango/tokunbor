const express = require("express")
const router = express.Router()

const { textToSpeech } = require("../controllers/ttsController")

router.post("/convert", textToSpeech)

module.exports = router