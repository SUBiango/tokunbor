import Input from '../components/input/Input'
import Intro from '../components/intro/Intro'
import './GuestLayout.css'

function GuestLayout() {
    return <div className="container guest-container">
        <Intro />
        <Input />
    </div>
}

export default GuestLayout