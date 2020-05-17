import React from 'react';
import './index.css';
import { extensionId } from "../env";

const App = () => {
  const sendPauseMessage = () => {
    chrome.runtime.sendMessage(extensionId, {msg: "PAUSE"}, () => {console.log('cb')});
  };

  const sendPlayMessage = () => {
    chrome.runtime.sendMessage(extensionId, {msg: "PLAY"}, () => {console.log('cb')});
  };

  return (
    <div className='App'>
      <button onClick={sendPauseMessage}>pause</button>
      <button onClick={sendPlayMessage}>play</button>
    </div>
  )
};

export default App;