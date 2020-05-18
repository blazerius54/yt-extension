let player;

function onYouTubePlayer() {
  console.log('onYouTubePlayer');

  player = new YT.Player('player', {
    height: '100',
    width: '100',
    // videoId: 'M7lc1UVf-VE',
    events: {
      // 'onReady': onPlayerReady,
    },
  });
}

function loadPlayer() {
  console.log('loadPlayer');
  if (typeof (YT) === 'undefined' || typeof (YT.Player) === 'undefined') {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubePlayerAPIReady = function () {
      onYouTubePlayer();
    };
    console.log('loadPlayer 1');
  } else {
    onYouTubePlayer();
    console.log('loadPlayer 2');
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, (response) => {
    console.log(response);
  });
});

function onPlayerReady(event) {
  console.log(event);
  event.target.playVideo();
}


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.msg == 'PAUSE') {
      player.pauseVideo();
    }

    if (request.msg == 'PLAY') {
      player.loadVideoById(request.videoURL.split('watch?v=')[1]);
      // console.log(request.videoURL.split('watch?v=')[1]);
      player.playVideo();
    }

    if (request.msg == 'LINK') {
      player.loadVideoById('usIhD6ncTO8');
      console.log(player);
    }
  },
);

window.addEventListener('load',
  () => {
    console.log('background document onload');
    document.write('<div id="player"></div>');

    loadPlayer();
  });
