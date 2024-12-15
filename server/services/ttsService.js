const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

// Create a client 
const client = new textToSpeech.TextToSpeechClient();

/**
 * Converts text to speech using the Google Cloud Text-to-Speech API.
 * 
 * @param {string} text - The text to be converted to speech.
 * @param {string} [language="en-US"] - The language code for the desired language (default: "en-US").
 * @param {string} [name="en-US-Wavenet-D"] - The name of the voice to be used for speech synthesis (default: "en-US-Wavenet-D").
 * @param {number} [speakingRate=1.0] - The speaking rate for the synthesized speech (default: 1.0).
 * @returns {Promise<Buffer>} - A promise that resolves to the audio content in MP3 format as a Buffer.
 */
async function convertTextToSpeech(text, language = "en-US", voice = "en-US-Wavenet-D", speakingRate = 1.0) {
    const request = {
        input: { text: text },
        voice: { languageCode: language, name: voice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: speakingRate }
    }

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request)

    // Save audio file to disk
    const writeFile = util.promisify(fs.writeFile)
    const fileName = 'output.mp3'
    await writeFile(fileName, response.audioContent, 'binary')
    console.log(`Audio content written to file ${fileName}`)

    // Return audio content 
    return response.audioContent
}

module.exports = { convertTextToSpeech }