import axios from "axios";

const ttsApi = axios.create({
    baseURL: "http://localhost:5000/api/tts",
    headers: {
        "Content-Type": "application/json",
    },
})

export default ttsApi