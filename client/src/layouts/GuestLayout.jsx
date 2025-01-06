import TextInput from '../components/input/TextInput'
import Intro from '../components/intro/Intro'
import './GuestLayout.css'

function GuestLayout() {
    return <div className="container guest-container">
        <Intro />
        <TextInput />
    </div>
}

export default GuestLayout