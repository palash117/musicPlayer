//constants
const musicList = [
    "allthat",
    "dubstep",
    "evolution",
    "funnysong",
    "highoctane",
    "jazzcomedy",
    "rumble",
];
const musicNames = [
    "All that",
    "Dubstep",
    "Evolution",
    "Funny song?",
    "High Octane",
    "Jazz comedy",
    "Rumble",
];
//variables
var currentSong;
var currentSongIndex = 0; //Math.floor(Math.random() * musicList.length);
var isPlaying = false;
var useClicked = false;

//dom elements
var progressContiainer;
var playbutton;
var elMusicArt;
var elAudio;
var elNext;
var elPrevious;
var elMusicName;
var elMusicProgress;
var elMusicProgressBar;

// init
var init = () => {
    initDomRefferences();
    setEventListeners();
    initializeDomValues();
};

// initDomRefferences
var initDomRefferences = () => {
    progressContiainer = document.querySelector(".progressContainer");
    playbutton = document.querySelector(".play");
    elMusicArt = document.querySelector(".musicArt");
    elAudio = document.querySelector("#audio");
    elNext = document.querySelector(".next");
    elPrevious = document.querySelector(".previous");
    elMusicName = document.querySelector(".musicName");
    elMusicProgress = document.querySelector(".progressed");
    elMusicProgressBar = document.querySelector(".musicName");
};

var setEventListeners = () => {
    playbutton.addEventListener("click", playerPlayPause);
    elPrevious.addEventListener("click", playerPrevious);
    elNext.addEventListener("click", playerNext);
    elMusicProgressBar.addEventListener("click", playerScrub);
};

var initializeDomValues = () => {
    elMusicArt.src = getSongArt(currentSongIndex);
    elAudio.src = getCurrentSong(currentSongIndex);
    elMusicProgress.style.width = "0%";
    elMusicName.innerHTML = musicNames[currentSongIndex];
    isPlaying = false;
    if (useClicked) playerPlayPause();
    updateAudioPlayerHooks();
};

//event listeners

//util functions
var getSongArt = (index) => {
    return `./music/art/${musicList[index]}.jpg`;
};
var getCurrentSong = (index) => {
    return `./music/mp3/${musicList[index]}.mp3`;
};

//player functions
var playerPlayPause = () => {
    if (isPlaying && useClicked) {
        progressContiainer.classList.add("hideProgress");
        elMusicArt.classList.remove("playAnimation");
        playbutton.classList.add("fa-play");
        playbutton.classList.remove("fa-pause");
        elAudio.pause();
    } else {
        progressContiainer.classList.remove("hideProgress");
        elMusicArt.classList.add("playAnimation");
        playbutton.classList.remove("fa-play");
        playbutton.classList.add("fa-pause");
        elAudio.play();
    }
    isPlaying = !isPlaying;
    useClicked = true;
};

var playerPrevious = () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = musicList.length - 1;
    }
    initializeDomValues();
};

var playerNext = () => {
    currentSongIndex++;
    if (currentSongIndex >= musicList.length) {
        currentSongIndex = 0;
    }
    initializeDomValues();
};

var playerScrub = (event) => {
    console.log(event);
};
// player hooks
var updateProgress = () => {
    let value = `${Math.floor((audio.currentTime * 100) / audio.duration)}%`;
    // console.log(value);
    elMusicProgress.style.width = value;
};

var completed = () => {
    playerNext();
};

// setup player hooks
var updateAudioPlayerHooks = () => {
    elAudio.addEventListener("timeupdate", updateProgress);
    elAudio.addEventListener("ended", completed);
};
window.onload = init;
