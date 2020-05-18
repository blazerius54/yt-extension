import React from 'react';
import './index.css';
import { extensionId } from '../env';

const App = () => {
  const [videoURL, setVideoURL] = React.useState('');

  const handleLinkChange = (e) => {
    console.log(e.target.value, e.target);
    setVideoURL(e.target.value);
    // chrome.runtime.sendMessage(extensionId, {msg: "LINK", value: e.target.value}, () => {console.log('cb')});
  };

  const sendPauseMessage = () => {
    chrome.runtime.sendMessage(extensionId, { msg: 'PAUSE' }, () => { console.log('cb'); });
  };

  const sendPlayMessage = () => {
    chrome.runtime.sendMessage(extensionId, { msg: 'PLAY' }, () => { console.log('cb'); });
  };

  return (
    <div className="App">
      <div className="playerControls">
        <button onClick={sendPauseMessage}>pause</button>
        <button onClick={sendPlayMessage}>play</button>
      </div>
      <div className="videoSearch">
        <input onChange={handleLinkChange} />
      </div>
    </div>
  );
};

export default App;
