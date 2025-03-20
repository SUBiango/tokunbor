import { useVoices } from '../../hooks/useVoices'
import useTTSStore from '../../store/ttsStore'

export function Voice () {
    const { data: voices, isLoading, error } = useVoices()
    const { voice, setVoice, speed, setSpeed } = useTTSStore()

    if (isLoading) return 'Loading...'
    if (error) return 'Failed to load voices'

    return (
        <div>
            
            <div>
                <select 
                    value={voice} 
                    onChange={(e) => setVoice(e.target.value)} 
                    name="favorite-cuisine" 
                    aria-label="Select voice"
                    >
                    <option  value="select" disabled>
                        Select voice
                    </option>

                    {voices.map(voice => (
                        <option 
                            key={voice.name}  
                            value={voice.name} 
                            data-gender={voice.gender}
                        > 
                            {(voice.gender).charAt(0).toUpperCase() + (voice.gender).slice(1).toLowerCase()} 
                        </option>
                    ))}
                </select>
            </div>
            <div>
            <label>
                Speed: {speed}
                <input 
                    type="range" 
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
                </label>
            </div>
        </div>
    )
}

export default Voice