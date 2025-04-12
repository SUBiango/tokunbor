const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

// Create a client 
const client = new textToSpeech.TextToSpeechClient();


/**
 * Converts text to speech using Google Cloud Text-to-Speech API.
 *
 * @param {string} text - The text to be converted into speech.
 * @param {string} language - The language code (e.g., 'en-US') for the desired voice.
 * @param {string} voice - The specific voice to be used for the conversion.
 * @param {number} speakingRate - The speaking rate for the voice. 
 * @returns {Promise<Buffer>} - A promise that resolves to the audio content in MP3 format.
 */

async function convertTextToSpeech(text, language, voice, speakingRate) {
    const request = {
        input: { text: text },
        voice: { languageCode: language, name: voice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: speakingRate }
    }

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request)


    // Return audio content 
    return response.audioContent
}

module.exports = { convertTextToSpeech }