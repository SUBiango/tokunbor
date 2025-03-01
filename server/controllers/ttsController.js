const asyncHandler = require("express-async-handler")
const { convertTextToSpeech } = require("../services/ttsService")
const textToSpeech = require('@google-cloud/text-to-speech')

const client = new textToSpeech.TextToSpeechClient()

// @desc Convert text to speech
// @route POST /api/tts/convert
// @access Private
const convertTTS = asyncHandler(async (req, res) => {
    const {text, language, voice, speakingRate} = req.body

    if (!text) {
        return res.status(400).json({ message: "Text is required" })
    }

    const audioContent = await convertTextToSpeech(text, language, voice, speakingRate)
    res.status(200).json({ audio: audioContent })
})

// @desc Get list of voices
// @route GET /api/tts/convert
// @access Private

const listVoices = asyncHandler(async (req, res) => {
    const [result] = await client.listVoices({}) 

    const voices = result.voices
        .filter(voice => voice.languageCodes.some(lang => lang.startsWith('en-')))
        .map(voice => ({ 
            name: voice.name, 
            gender: voice.ssmlGender
        }))
        // console.log(voices)
    res.status(200).json({ voices, language: 'English' })
})

module.exports = {
    convertTTS,
    listVoices
}