import './PlayBar.css'

function PlayBar() {
    return (
        <div className="play-bar">
            <audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" className="audio"></audio>
        </div>
    )
}

export default PlayBar