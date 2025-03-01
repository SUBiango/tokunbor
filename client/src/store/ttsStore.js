import { create } from "zustand";

const useTTSStore = create((set) => ({
    text: '',
    language: 'en-US',
    voice: '',
    speed: 1,
    audioUrl: null,
    setText: (text) => set({ text }),
    setLanguage: (language) => set({ language }),
    setVoice: (voice) => set({ voice }),
    setSpeed: (speed) => set({ speed }),
    setAudioUrl: (audioUrl) => set({ audioUrl })
}))

export default useTTSStore