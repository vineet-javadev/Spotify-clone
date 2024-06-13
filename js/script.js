// global variables
var songsTitle = [];
var songsHref = {};
var currentTrack = new Audio();
var songs;

// default seting value for audio
currentTrack.volume = 0.6;
var currentVolRange = currentTrack.volume;
document.getElementById("volumeRange").value = currentVolRange * 100;

document.getElementById("a1").addEventListener("click", function (e) {
  if (document.getElementById("b1").style.flexWrap == "") {
    document.getElementById("b1").style.flexWrap = "wrap";
  } else {
    document.getElementById("b1").style.flexWrap = "";
  }
});
document.getElementById("a2").addEventListener("click", function (e) {
  if (document.getElementById("b2").style.flexWrap == "") {
    document.getElementById("b2").style.flexWrap = "wrap";
  } else {
    document.getElementById("b2").style.flexWrap = "";
  }
});
document.getElementById("a3").addEventListener("click", function (e) {
  if (document.getElementById("b3").style.flexWrap == "") {
    document.getElementById("b3").style.flexWrap = "wrap";
  } else {
    document.getElementById("b3").style.flexWrap = "";
  }
});

//fuction for retrive key from value of object
function getKeyByValue(obj, value) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  return null;
}

document.getElementById("previous").addEventListener("click", function (e) {
  if (currentTrack.src != "") {
    console.log("previous button press");
    let k = document.querySelector(".w-title").innerHTML;
    // console.log(k);
    let val = songsHref[k];
    // console.log(val);
    let objIndex = -1;

    // console.log(Object.values(songsHref)[0]);
    for (let i = 0; i < Object.keys(songsHref).length; i++) {
      // console.log(Object.values(songsHref)[i]);
      if (Object.values(songsHref)[i] === val) {
        objIndex = i;
        break;
      }
    }
    // console.log(objIndex);
    // console.log(Object.values(songsHref)[objIndex-1]);
    // console.log(getKeyByValue(songsHref , Object.values(songsHref)[objIndex-1]));
    if (objIndex > 0) {
      playMusic(
        getKeyByValue(songsHref, Object.values(songsHref)[objIndex - 1])
      );
    }
  }
});
document.getElementById("play-pause").addEventListener("click", function (e) {
  // if user press directly play button without selection any of song form library then play first music
  if (currentTrack.src == "") {
    // get retrieve first song title form library
    let getText = document
      .querySelector(".bottom-content-first")
      .getElementsByTagName("span")[1].innerHTML;
    document.querySelector(".w-title").innerHTML = getText;
    currentTrack.src = Object.values(songsHref)[0];
    currentTrack.play();
    document.getElementById("play-pause").src =
      "resources/images/icons/pauseIcon.svg";
  } else {
    if (currentTrack.paused) {
      currentTrack.play();
      document.getElementById("play-pause").src =
        "resources/images/icons/pauseIcon.svg";
    } else {
      currentTrack.pause();
      document.getElementById("play-pause").src =
        "resources/images/icons/playIcon.svg";
    }
  }
});
document.getElementById("next").addEventListener("click", function (e) {
  if (currentTrack.src != "") {
    console.log("next button is press");
    let k = document.querySelector(".w-title").innerHTML;
    // console.log(k);
    let val = songsHref[k];
    // console.log(val);
    let objIndex = -1;

    // console.log(Object.values(songsHref)[0]);
    for (let i = 0; i < Object.keys(songsHref).length; i++) {
      // console.log(Object.values(songsHref)[i]);
      if (Object.values(songsHref)[i] === val) {
        objIndex = i;
        break;
      }
    }
    // console.log(objIndex);
    // console.log(Object.values(songsHref)[objIndex-1]);
    // console.log(getKeyByValue(songsHref , Object.values(songsHref)[objIndex-1]));
    if (objIndex < Object.keys(songsHref).length - 1) {
      playMusic(
        getKeyByValue(songsHref, Object.values(songsHref)[objIndex + 1])
      );
    }
  }
});

const playMusic = (args) => {
  // var audio = new Audio("http://127.0.0.1:5500/songs/Cheret1.mp3");

  currentTrack.src = songsHref[args];
  currentTrack.play();
  document.getElementById("play-pause").src =
    "resources/images/icons/pauseIcon.svg";

  //update the title of current track
  document.getElementById(
    "currentSongTitle"
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" color="#000000" fill="none">
      <path d="M21.5 12.5C21.5 18.0228 17.0228 22.5 11.5 22.5C5.97715 22.5 1.5 18.0228 1.5 12.5C1.5 6.97715 5.97715 2.5 11.5 2.5C12.6688 2.5 13.7907 2.70051 14.8333 3.06902" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M19.5 9C19.5 10.3807 18.3807 11.5 17 11.5C15.6193 11.5 14.5 10.3807 14.5 9C14.5 7.61929 15.6193 6.5 17 6.5C18.3807 6.5 19.5 7.61929 19.5 9ZM19.5 9V1.5C19.8333 2 20.1 4.1 22.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13 12.5C13 11.6716 12.3284 11 11.5 11C10.6716 11 10 11.6716 10 12.5C10 13.3284 10.6716 14 11.5 14C12.3284 14 13 13.3284 13 12.5Z" stroke="currentColor" stroke-width="1.5" />
  </svg><span class="w-title">${args}</span> `;
  // console.log("duration : ");
};

// getSongs();
async function getSongs(getFolder) {
  // reset all songs previous details
  songsTitle = [];
  songsHref = [];

  let data = await fetch(`${getFolder}/`);
  let response = await data.text();
  // console.log(response);
  let createDiv = document.createElement("div");
  createDiv.innerHTML = response;
  // console.log(createDiv);

  let as = createDiv.getElementsByTagName("a");
  // console.log(as);

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.title.endsWith(".mp3") || element.title.endsWith(".wav")) {
      let elmTitle = element.title;
      let temp = elmTitle.replace(".mp3", "");
      temp = temp.replace(".wav", "");

      songsTitle.push(temp);

      //before storing the links in obj we need to remove extra spaces form keys
      // console.log(`'${temp}'`);
      songsHref[temp] = element.href;

      // lines for testing
      // console.log(element.title)
      // console.log(temp)
      // console.log(element.href)
      // console.log(songsHref)
    }
  }

  // console.log(songsTitle);
  // console.log(songsHref);

  return songsTitle;
}

async function updateLibrary(folder) {
  songs = [];
  songs = await getSongs(folder);
  console.log(songs);
  let targetDiv = document
    .querySelector(".songsList")
    .getElementsByTagName("ol")[0];

  // reset songs list in library
  document.querySelector(".songsList").getElementsByTagName("ol")[0].innerHTML =
    "";
  for (let index = 0; index < songs.length; index++) {
    const element = songs[index];

    targetDiv.innerHTML =
      targetDiv.innerHTML +
      ` <li><div
                  class="bottom-content-first bg-lightGray flex align-content gap-7 f1-text"
                >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
    <path d="M21.5 12.5C21.5 18.0228 17.0228 22.5 11.5 22.5C5.97715 22.5 1.5 18.0228 1.5 12.5C1.5 6.97715 5.97715 2.5 11.5 2.5C12.6688 2.5 13.7907 2.70051 14.8333 3.06902" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M19.5 9C19.5 10.3807 18.3807 11.5 17 11.5C15.6193 11.5 14.5 10.3807 14.5 9C14.5 7.61929 15.6193 6.5 17 6.5C18.3807 6.5 19.5 7.61929 19.5 9ZM19.5 9V1.5C19.8333 2 20.1 4.1 22.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 12.5C13 11.6716 12.3284 11 11.5 11C10.6716 11 10 11.6716 10 12.5C10 13.3284 10.6716 14 11.5 14C12.3284 14 13 13.3284 13 12.5Z" stroke="currentColor" stroke-width="1.5" />
</svg>
                  </span>
                  <span>${element}</span>
                </div></li>`;
  }
  let arr = document.querySelector(".songsList").getElementsByTagName("li");
  for (const iterator of arr) {
    iterator.addEventListener("click", (e) => {
      let tempAgain = document.createElement("div");
      tempAgain = iterator;
      let a = tempAgain.querySelectorAll("span");
      let title = a[1].innerHTML;

      // this console only testing purpose
      // console.log(title);
      // playMusic(titl;e);

      playMusic(title);
    });
  }
  if (currentTrack.paused) {
    playMusic(songs[0]);
  }
}

//using chatgpt to convert seconds into min-second format
function convertSecondsToMinutes(seconds) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad minutes and seconds with leading zero if needed
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");

  // Return the formatted string
  return `${~~paddedMinutes}:${~~paddedSeconds}`;
}

// time update function
currentTrack.addEventListener("timeupdate", () => {
  document
    .querySelector(".trackUpdate")
    .getElementsByTagName("span")[0].innerHTML = `${convertSecondsToMinutes(
    currentTrack.currentTime
  )}`;
  document
    .querySelector(".trackUpdate")
    .getElementsByTagName("span")[1].innerHTML = `${convertSecondsToMinutes(
    currentTrack.duration
  )}`;
  let knowPercent = (currentTrack.currentTime * 100) / currentTrack.duration;
  document.querySelector(".circle").style.left = `${knowPercent}%`;

  if (currentTrack.currentTime == currentTrack.duration) {
    document.getElementById("play-pause").src =
      "resources/images/icons/playIcon.svg";
  }
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
  // console.log(e.target , e.offsetX , e.target.clientWidth);
  document.querySelector(".circle").style.left = e.offsetX + "px";
  let songSeekTimePercent = (e.offsetX * 100) / e.target.clientWidth;
  currentTrack.currentTime =
    (songSeekTimePercent * currentTrack.duration) / 100;
});

document.getElementById("menu-btn").addEventListener("click", () => {
  document.querySelector(".bottom").style.left = "100%";
  document.querySelector(".head-bottom").style.padding = "10px";
  document.querySelector(".right").style.display = "none";
});

document.getElementById("cross-btn").addEventListener("click", () => {
  document.querySelector(".bottom").style.left = "-100%";
  document.querySelector(".right").style.display = "block";
});

document.querySelector(".volume>label>img").addEventListener("click", (e) => {
  if (e.target.src.includes("resources/images/icons/unmute.svg")) {
    currentTrack.volume = 0;
    e.target.src = "resources/images/icons/mute.svg";
    document.getElementById("volumeRange").value = "0";
  } else {
    currentTrack.volume = currentVolRange;
    e.target.src = "resources/images/icons/unmute.svg";
    document.getElementById("volumeRange").value = currentVolRange * 100;
  }
  console.log(currentVolRange);
});

document.getElementById("volumeRange").addEventListener("change", (e) => {
  // console.log(e.target.value);
  currentTrack.volume = e.target.value / 100;
  currentVolRange = currentTrack.volume;
});

// fetch data from json file
async function fetchJsonData(url) {
  try {
    const response = await fetch(url);

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
//load the content from the album folder
async function loadAlbums(albumFolder) {
  let fname = [];
  let data = await fetch(`albums/${albumFolder}/`);
  let response = await data.text();

  let createDiv = document.createElement("div");
  createDiv.innerHTML = response;
  for (const iterator of createDiv.querySelectorAll("a")) {
    if (
      iterator.href.includes(`albums/${albumFolder}`) &&
      iterator.title.length !== 0
    ) {
      // console.log(iterator.title , iterator);
      fname.push(iterator.title);
    }
  }
  return fname;
}

// update album in our website
async function UpdateAlbums(whichContainer, albumFolder) {
  let folders = await loadAlbums(albumFolder);
  console.log(folders);
  for (const iterator of folders) {
    let fetchedData = await fetchJsonData(
      `albums/${albumFolder}/${iterator}/info.json`
    );
    // console.log(fetchedData)
    if (whichContainer === "b1") {
      document.getElementById(whichContainer).innerHTML =
        document.getElementById(whichContainer).innerHTML +
        `
      <div id="artists-card" class="card artistCard" data-folder="albums/${albumFolder}/${iterator}/songs">
      <div class="play">
                <img src="resources/images/icons/playGreenBtn.svg" alt="playGreenBtn">
              </div>
                <div class="thumbnail">
                  <img src="albums/${albumFolder}/${iterator}/cover.jpg" alt="" />
                </div>
                <div class="details">
                  <h5>${fetchedData.artist}</h5>
                  <h6 class="gray-text">${fetchedData.type}</h6>
                </div>
      `;
    } else {
      document.getElementById(whichContainer).innerHTML =
        document.getElementById(whichContainer).innerHTML +
        `
    <div class="card" data-folder="albums/${albumFolder}/${iterator}/songs">
    <div class="play">
                <img src="resources/images/icons/playGreenBtn.svg" alt="playGreenBtn">
              </div>
              <div class="thumbnail">
                <img src="albums/${albumFolder}/${iterator}/cover.jpg" alt="" />
              </div>
              <div class="details">
                <h5>${fetchedData.artist}</h5>
                <h6 class="gray-text">${fetchedData.type}</h6>
              </div>
    `;
    }
  }
}

//add event listener for every card
function cardActivation(){
  console.log("card is activated for do events")
  for (const iterator of document.getElementsByClassName("card")) {
    // console.log("1")
    // console.log(iterator.dataset.folder)
    console.log(iterator)
    iterator.addEventListener("click", () => {
      console.log("clicked")
      updateLibrary(iterator.dataset.folder);
      document.querySelector(".bottom").style.left = "100%";
      document.querySelector(".head-bottom").style.padding = "10px";
      document.querySelector(".head-bottom").style.zIndex = "10";
      document.querySelector(".left").style.zIndex = "10";
    });
  }
}

// entry point

UpdateAlbums("b1", "p-artists");
UpdateAlbums("b2", "p-playlists");
UpdateAlbums("b3", "p-hits");
setTimeout(() => {
  cardActivation();
}, 1000);
