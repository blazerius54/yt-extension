let player;

function onYouTubePlayer() {
  console.log('onYouTubePlayer');

  player = new YT.Player('player', {
    height: '100',
    width: '100',
    videoId: 'M7lc1UVf-VE',
    events: {
      // 'onReady': onPlayerReady,
    }
  });
}

function loadPlayer() {
  console.log('loadPlayer')
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag)
    window.onYouTubePlayerAPIReady = function() {
      onYouTubePlayer();
    };
    console.log('loadPlayer 1')


  } else {

    onYouTubePlayer();
    console.log('loadPlayer 2')

  }
}

function onPlayerReady(event) {
  console.log(event)
  event.target.playVideo();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse)
    if(request.msg == 'PAUSE') {
      player.pauseVideo();
    }

    if(request.msg == 'PLAY') {
      player.playVideo();
    }
});

window.addEventListener('load',
  function () {
    console.log('background document onload');
    document.write('<div id="player"></div>');

    loadPlayer()
  }
);
