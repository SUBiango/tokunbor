import useTTSStore from '../../store/ttsStore'
import { useTtsMutation } from '../../services/ttsService'
import Loader from '../spinner/Loader'
import "./PlayButton.css"
import { useVoices } from '../../hooks/useVoices'
import { useEffect } from 'react'

/**
 * PlayButton component renders a button that converts text to speech and plays the audio.
 * 
 * It utilizes the TTS API to perform the conversion and manages the audio URL state.
 * The component handles the play operation with error and loading state management.
 * 
 * @returns {JSX.Element} A button that initiates text-to-speech conversion and playback.
 * 
 * @example
 * <PlayButton />
 */

function PlayButton() {
    const { mutate, isLoading, error } = useTtsMutation()
    const text = useTTSStore((state) => state.text)
    const voice = useTTSStore((state) => state.voice)
    const speed = useTTSStore((state) => state.speed)
    const notify = useTTSStore((state) => state.notification)
    const setAudioUrl = useTTSStore((state) => state.setAudioUrl)
    const setVoice = useTTSStore((state) => state.setVoice)

    const { data: voices } = useVoices()

    useEffect(() => {
        if (voices && voices.length > 0) {
            setVoice(voices[0].name)
        }
    }, [voices, setVoice])

    const handlePlay = async () => {
        if (!text.trim()) {
            alert('Please enter text to convert.')
            return
        }

        const payload = { 
            text, 
            language: 'en-GB', 
            voice, 
            speakingRate: speed 
        }

        mutate(payload, {
            onSuccess: (data) => {
                // Create an audioUrl from the buffer data
                const audioBlob = new Blob([new Uint8Array(data.audio.data)], {
                    type: 'audio/mp3'
                })

                const audioUrl = URL.createObjectURL(audioBlob)
                setAudioUrl(audioUrl)
            },

            onError: (error) => {
                console.error('Failed to convert text to speech:', error)
            }
        })
    }

    return (
        <>
            <button className="convertBtn" onClick={handlePlay} disabled={isLoading}>
                {isLoading ? <Loader /> : 'Convert & Play'}
            </button>
            {error && <p>Error: {error.message}</p>}
        </>
    )
}

export default PlayButton