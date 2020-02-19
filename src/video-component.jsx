import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function VideoComponent(props) {

  return <YouTube videoId={props.ytId} opts={opts} onEnd={props.onSongEnd} />;
}

export default VideoComponent;
