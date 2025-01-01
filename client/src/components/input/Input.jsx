import Button from '../button/Button'
import PlayBar from '../play-bar/PlayBar'
import './Input.css'

function Input() {
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

export function InputSettings() {
    return (
        <div>
            <div>
                <select name="favorite-cuisine" aria-label="Select language">
                <option selected disabled value="">
                    Select language...
                </option>
                <option>Italian</option>
                <option>Japanese</option>
                </select>
            </div>
            <div>
                <select name="favorite-cuisine" aria-label="Select voice">
                <option selected disabled value="">
                    Select voice...
                </option>
                <option>Italian</option>
                <option>Japanese</option>
                </select>
            </div>
            <div>
            <select name="select-speed" aria-label="select speed">
                <option selected disabled value="">
                    Select speed...
                </option>
                <option>Italian</option>
                <option>Japanese</option>
                </select>
            </div>
            <Button />
        </div>
    )
}




export default Input