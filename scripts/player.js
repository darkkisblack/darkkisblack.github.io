var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



let playControls = document.querySelector(".player_controls");
let playBtn = document.querySelector(".play_btn");
let playControl = document.querySelector(".play_timer");
let voluemBtn = document.querySelector(".volume_btn");
let voluemControl = document.querySelector(".volume_range");

let videoDuration = document.querySelector(".player__duration-estimate");
let completedDuration = document.querySelector(".player__duration-completed");

let playPointDuration = document.querySelector(".play_point-duration");

let playTimer = document.querySelector(".player_timer_wrap");

let playerSplash = document.querySelector(".player__splash");

let playerWrapper = document.querySelector(".player__wrapper");

let volumeRange = document.querySelector(".volume_range-wrap");
let volumePointDuration = document.querySelector(".volume_point-duration");

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player_content", {
    videoId: "CRT39ITMANs",
    playerVars: {
      controls: 0,
      disabledkb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case 1:
      playerWrapper.classList.add("player__wrapper--active");
      playBtn.classList.add("player_paused");
      break;
    case 2:
      playBtn.classList.remove("player_paused");
      break;
  }
}

function onPlayerReady() {
  let getDurationInSeconds = player.getDuration();
  let interval;

  clearInterval(interval);

  interval = setInterval(() => {
    let compleatedSeconds = player.getCurrentTime();
    let percent = (compleatedSeconds / getDurationInSeconds) * 100;
    playPointDuration.style.left = `${percent}%`;
    completedDuration.textContent = formatTime(compleatedSeconds);
  }, 1000);

  videoDuration.textContent = formatTime(getDurationInSeconds);
}

function formatTime(time) {
  let roundTime = Math.round(time);

  let minutes = Math.floor(roundTime / 60);

  let seconds = roundTime - minutes * 60;

  let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formatSeconds}`;
}

playBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (playBtn.classList.contains("player_paused")) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

playTimer.addEventListener("click", e => {
  e.preventDefault();
  let newPointPosition = e.pageX - playTimer.getBoundingClientRect().left;
  let clickedPercent =
    (newPointPosition / parseInt(getComputedStyle(playTimer).width)) * 100;
  let newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  if (clickedPercent < 100) {
    playPointDuration.style.left = `${clickedPercent}%`;
  }
  player.seekTo(newPlayerTime);
});

playerSplash.addEventListener("click", e => {
  player.playVideo();
});

voluemBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if (voluemBtn.classList.contains("volume_btn--active")) {
    player.unMute();
    voluemBtn.classList.remove("volume_btn--active");
  } else {
    player.unMute();
    player.mute();
    voluemBtn.classList.add("volume_btn--active");
  }
});

volumeRange.addEventListener("click", e => {
  e.preventDefault();
  let newVolumePosition = e.pageX - volumeRange.getBoundingClientRect().left;
  let clickedVolumePercent =
    (newVolumePosition / parseInt(getComputedStyle(volumeRange).width)) * 100;

  if (clickedVolumePercent < 100) {
    volumePointDuration.style.left = `${clickedVolumePercent}%`;
  }

  player.setVolume(clickedVolumePercent);
});
