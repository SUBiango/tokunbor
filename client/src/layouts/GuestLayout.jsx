import Intro from '../components/intro/Intro'
import AudioPlayer from '../components/audio-player/AudioPlayer'
import TextInput from '../components/input/TextInput'
import InputContainer from '../components/input-container/InputContainer'
import InputSettingsContainer from '../components/input-settings-container/InputSettingsContainer'
import Voice from '../components/input-settings/Voice'
import Language from '../components/input-settings/language'
import PlayButton from '../components/button/PlayButton'
import './GuestLayout.css'
import useTTSStore from '../store/ttsStore'

function GuestLayout() {
    const audioUrl = useTTSStore((state) => state.audioUrl)

    return <div className="container guest-container">
        <Intro />
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
        <InputContainer>
            <TextInput />
            <InputSettingsContainer>
                <Language />
                <Voice />
                <PlayButton />
            </InputSettingsContainer>
        </InputContainer>
    </div>
}

export default GuestLayout