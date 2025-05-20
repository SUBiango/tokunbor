const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

let client = null;

async function convertTextToSpeech(text, language, voice, speakingRate) {
  if (!client) {
    throw new Error('Text-to-Speech client not initialized. Check GOOGLE_APPLICATION_CREDENTIALS_BASE64 environment variable.');
  }

  const request = {
    input: { text: text },
    voice: { languageCode: language, name: voice },
    audioConfig: { audioEncoding: 'MP3', speakingRate: speakingRate }
  };

  // Perform the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // Return audio content 
  return response.audioContent;
}

// Initialize the client if credentials are available
const base64Credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

if (base64Credentials) {
  try {
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const credentialsObject = JSON.parse(decodedCredentials);

    // Create a temporary file to store the credentials
    const tempCredentialsPath = path.join(__dirname, 'google-credentials.json');
    fs.writeFileSync(tempCredentialsPath, JSON.stringify(credentialsObject));

    // Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tempCredentialsPath;
    
    console.log('Google Application Credentials loaded from environment variable');

    // Initialize the Text-to-Speech client
    client = new textToSpeech.TextToSpeechClient();

    // Clean up the temporary credentials file
    process.on('exit', () => {
      fs.unlink(tempCredentialsPath, (err) => {
        if (err) {
          console.error('Error deleting temporary credentials file:', err);
        } else {
          console.log('Temporary credentials file deleted');
        }
      });
    });

  } catch (error) {
    console.error('Error processing Google Application Credentials from environment variable:', error);
  }
} else {
  console.warn('GOOGLE_APPLICATION_CREDENTIALS_BASE64 environment variable not set.');
}

module.exports = { convertTextToSpeech };