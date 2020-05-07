import React from 'react';
import YouTube from 'react-youtube';
import './index.css';

export default class App extends React.Component {
  state = {player: null};

  setPlayer = (e) => {
    this.setState({
      player: e.target,
    })
  };

  render () {
    return (
      <div className='App'>
        <YouTube
          videoId="2g811Eo7K8U"
          onReady={this.setPlayer}
        />
        <button onClick={() => {
          console.log(this.state);
          this.state.player.playVideo();
        }}>
          play video
        </button>
        <button onClick={() => {
          console.log(this.state);
          this.state.player.pauseVideo();
        }}>
          pause video
        </button>
      </div>
    )
  }
}