import { create } from "zustand";

const useTTSStore = create((set) => ({
    text: '',
    language: 'en-US',
    voice: '',
    speed: 1.0,
    audioUrl: null,
    notification: "Please enter text to convert",
    setText: (text) => set({ text }),
    setLanguage: (language) => set({ language }),
    setVoice: (voice) => set({ voice }),
    setSpeed: (speed) => set({ speed }),
    setAudioUrl: (audioUrl) => set({ audioUrl }),
    setNotification: (notification) => set({notification})
}))

export default useTTSStore