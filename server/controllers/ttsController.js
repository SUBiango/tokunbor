const asyncHandler = require("express-async-handler")
const { convertTextToSpeech } = require("../services/ttsService")

// @desc Convert text to speech
// @route POST /api/tts/convert
// @access Private
const textToSpeech = asyncHandler(async (req, res) => {
    const {text, language, voice, speakingRate} = req.body
    console.log(req.body)

    if (!text) {
        return res.status(400).json({ message: "Text is required" })
    }

    const audioContent = await convertTextToSpeech(text, language, voice, speakingRate)
    res.status(200).json({ audio: audioContent })
})

module.exports = {
    textToSpeech
}