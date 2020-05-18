import React, { useState, useEffect } from 'react';
import './index.css';
import { extensionId } from '../env';

const App = () => {
  const [videoURL, setVideoURL] = useState('');

  const handleLinkChange = (e) => {
    console.log(e.target.value, e.target);
    setVideoURL(e.target.value);
    // chrome.runtime.sendMessage(extensionId, {msg: "LINK", value: e.target.value}, () => {console.log('cb')});
  };

  const sendPauseMessage = () => {
    chrome.runtime.sendMessage(extensionId, { msg: 'PAUSE' });
  };

  const sendPlayMessage = () => {
    chrome.runtime.sendMessage(extensionId, { msg: 'PLAY', videoURL });
    localStorage.setItem('videoURL', videoURL);
  };

  useEffect(() => {
    console.log();
    const videoURLFromStorage = localStorage.getItem('videoURL');
    if (videoURLFromStorage && videoURLFromStorage.length) {
      setVideoURL(videoURLFromStorage);
      // chrome.runtime.sendMessage(extensionId, { msg: 'PLAY', videoURL: 'https://www.youtube.com/watch?v=' + videoURL });
    }
  }, []);

  return (
    <div className="App">
      <div className="playerControls">
        <button onClick={sendPauseMessage}>pause</button>
        <button onClick={sendPlayMessage}>play</button>
      </div>
      <div className="videoSearch">
        <input onChange={handleLinkChange} value={videoURL} />
      </div>
    </div>
  );
};

export default App;
