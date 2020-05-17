import React from 'react';
import './index.css';
import { extensionId } from "../env";


export default class App extends React.Component {
  sendPauseMessage() {
    chrome.runtime.sendMessage(extensionId, {msg: "PAUSE"}, () => {console.log('cb')});
  }

  sendPlayMessage() {
    chrome.runtime.sendMessage(extensionId, {msg: "PLAY"}, () => {console.log('cb')});
  }

  render () {
    return (
      <div className='App'>
        <button onClick={this.sendPauseMessage}>pause</button>
        <button onClick={this.sendPlayMessage}>play</button>
      </div>
    )
  }
}