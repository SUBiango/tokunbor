import { useRef, useEffect } from 'react'
import './AudioPlayer.css'

function AudioPlayer({ audioUrl }) {
    const audioRef = useRef(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Error playing audio:', error)
                alert('Failed to play audio. Please try again.')
            })
        }
    }, [audioUrl])

    return (
        <div className="play-bar">
            <audio
                ref={audioRef}  
                controls 
                src={audioUrl} 
                type="audio/mpeg" 
                className="audio"
            >   
            </audio>
        </div>
    )
}

export default AudioPlayer