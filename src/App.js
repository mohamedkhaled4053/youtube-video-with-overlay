import "./App.scss";
import ReactPlayer from "react-player";
import Overlay from "./Overlay";
import DialogOverlay from "./DialogOverlay";
import { useVideoContext } from "./VideoContext";

function App() {
  let {
    playerState,
    playerRef,
    handlePlay,
    handlePause,
    handleOnPlaybackRateChange,
    handleEnded,
    handleProgress,
    handleDuration,
  } = useVideoContext();

  let { playing, playbackRate } = playerState;

  return (
    <div className="App">
      <header className="App-header">
        <div className="video">
          <Overlay />
          <DialogOverlay />
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            width="100%"
            height="100%"
            url={"https://www.youtube.com/watch?v=M2LdF1RlSL0"}
            playing={playing}
            playbackRate={playbackRate}
            volume={1}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={handlePlay}
            onPause={handlePause}
            onBuffer={() => console.log("onBuffer")}
            onPlaybackRateChange={handleOnPlaybackRateChange}
            onSeek={(e) => console.log("onSeek", e)}
            onEnded={handleEnded}
            onError={(e) => console.log("onError", e)}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onPlaybackQualityChange={(e) =>
              console.log("onPlaybackQualityChange", e)
            }
          />
        </div>
      </header>
    </div>
  );
}

export default App;
