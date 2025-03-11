import { useVoices } from '../../hooks/useVoices'
import useTTSStore from '../../store/ttsStore'

export function Voice () {
    const { data: voices, isLoading, error } = useVoices()
    const { voice, setVoice } = useTTSStore()

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
                            {(voice.gender).toLowerCase()} 
                        </option>
                    ))}
                </select>
            </div>
            <div>
            <label>
                Speed
                <input type="range" />
                </label>
            </div>
        </div>
    )
}

export default Voice