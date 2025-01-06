import api from './api'

export const getTTS = async (text, language, voice) => {
    const response = await api.post('/tts', { text, language, voice })
    return response
}