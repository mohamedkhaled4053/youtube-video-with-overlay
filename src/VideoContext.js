import React, { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";

const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {
  let [playerState, setPlayerState] = useState({
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    seeking: false,
  });

  let [openRates, setOpenRates] = useState(false);

  let playerRef = useRef();
  let dialogRef = useRef();

  const handlePlayPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  const handleSetPlaybackRate = (e) => {
    setPlayerState({
      ...playerState,
      playbackRate: parseFloat(e.target.value),
    });
  };

  const handleOnPlaybackRateChange = (speed) => {
    setPlayerState({ ...playerState, playbackRate: parseFloat(speed) });
  };

  const handlePlay = () => {
    console.log("onPlay");
    setPlayerState({ ...playerState, playing: true });
  };

  const handlePause = () => {
    console.log("onPause");
    setPlayerState({ ...playerState, playing: false });
  };

  const handleSeekMouseDown = (e) => {
    setPlayerState({ ...playerState, seeking: true });
  };

  const handleSeekChange = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value));
    setPlayerState({ ...playerState, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setPlayerState({ ...playerState, seeking: false });
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!playerState.seeking) {
      setPlayerState((prevState) => {
        return {
          ...prevState,
          loaded: state.loaded,
          played: state.played,
        };
      });
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    setPlayerState({ ...playerState, playing: false });
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setPlayerState({ ...playerState, duration });
  };

  const handleClickFullscreen = async () => {
    if (!screenfull.isFullscreen) {
      screenfull.request(findDOMNode(playerRef.current));
    } else {
      screenfull.exit();
    }
  };

  useEffect(() => {
    const handleChangeFullScreen = () => {
      if (screenfull.isFullscreen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    };
    screenfull.on("change", handleChangeFullScreen);
    return () => {
      screenfull.off("change", handleChangeFullScreen);
    };
  }, []);
  return (
    <VideoContext.Provider
      value={{
        playerState,
        openRates,
        playerRef,
        dialogRef,
        setPlayerState,
        setOpenRates,
        handlePlayPause,
        handleSetPlaybackRate,
        handleOnPlaybackRateChange,
        handlePlay,
        handlePause,
        handleSeekMouseDown,
        handleSeekChange,
        handleSeekMouseUp,
        handleProgress,
        handleEnded,
        handleDuration,
        handleClickFullscreen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
// make sure use
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context)
    throw new Error(
      "VideoContext must be called from within the VideoPorvider"
    );
  return context;
};
