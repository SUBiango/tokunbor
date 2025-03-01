import './TextInput.css'
import useTTSStore from '../../store/ttsStore'


export function TextInput() {
    const text = useTTSStore((state) => state.text)
    const setText = useTTSStore((state) => state.setText)

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    return (
        <textarea
            value={text}
            onChange={handleTextChange}
            name="bio"
            placeholder="Paste or type text here..."
            aria-label="Professional short bio"
        >
        </textarea>
    )
}




export default TextInput