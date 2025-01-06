import React, { useState } from 'react'
import { getTTS } from '../../services/ttsService'
import Button from '../button/Button'
import PlayBar from '../play-bar/PlayBar'
import './Input.css'

export function InputSettings() {
    return (
        <div>
            <div>
                <select name="favorite-cuisine" aria-label="Select language">
                <option  value="">
                    Language: Default
                </option>
                <option>Italian</option>
                <option>Japanese</option>
                </select>
            </div>
            <div>
                <select name="favorite-cuisine" aria-label="Select voice">
                <option value="">
                    Voice: Default
                </option>
                <option>Italian</option>
                <option>Japanese</option>
                </select>
            </div>
            <div>
            <label>
                Speed
                <input type="range" />
                </label>
            </div>
            <Button />
        </div>
    )
}


export function Textarea() {
    return (
        <textarea
            name="bio"
            placeholder="Write a professional short bio..."
            aria-label="Professional short bio"
        >
        </textarea>
    )
}

function TextInput() {
    const [text, setText] = useState('')
    const [language, setLanguage] = useState('en-US')
    const [voice, setVoice] = useState('en-US-Wavenet-D')

    const handleConvert = async () => {
        try {
            const response = await getTTS(text, language, voice)
            const audioContent = response.data
            const audioBlob = new Blob([audioContent], { type: 'audio/mp3' })
            const audioUrl = URL.createObjectURL(audioBlob)

            const audioElement = document.querySelector('.audio')
            if (audioElement) {
                audioElement.src = audioUrl
                audioElement.play()
            }


        } catch (error) {
            
        }
    }

    return (
        <form className="input">
            <div>
                <PlayBar />
                <Textarea /> 
            </div>
            <InputSettings />
        </form>
    )
}






export default TextInput