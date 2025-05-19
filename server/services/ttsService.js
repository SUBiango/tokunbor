const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

// Create a client 

let client

try {
  if (process.env.NODE_ENV === 'production') {
    // In production, read credentials from encoded.txt
    const encodedCreds = fs.readFileSync('./config/encoded.txt', 'utf8');
    const credentials = JSON.parse(Buffer.from(encodedCreds, 'base64').toString());
    client = new textToSpeech.TextToSpeechClient({
      credentials: credentials
    });
  } else {
    // In development, use local key.json
    client = new textToSpeech.TextToSpeechClient();
  }
} catch (error) {
  console.error('Error initializing Text-to-Speech client:', error);
  throw new Error(`Failed to initialize Text-to-Speech service: ${error.message}`);
}



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