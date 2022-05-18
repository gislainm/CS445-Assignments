"use strict";
/*eslint-disable */
const SERVER_ROOT = 'http://localhost:3000';
let mode;
window.onload = function () {
    if (localStorage.getItem('accessToken')) {
        afterLogIn();
    } else {
        notLoggedIn();
    }
    document.getElementById("loginBtn").onclick = function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username, password);
        fetch(`${SERVER_ROOT}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => loggedInFeatures(data));
    }
    document.getElementById("logout").onclick = function () {
        localStorage.removeItem('accessToken');
        document.getElementById("songList").innerHTML = null;
        document.getElementById("mySongs").innerHTML = null;
        notLoggedIn();
    }
    document.getElementById("searchBtn").onclick = search;
}

function notLoggedIn() {
    document.getElementById("loginInfo").style.display = 'block';
    document.getElementById("albumCovers").style.display = 'block';
    document.getElementById("marketing").style.display = 'block';
    document.getElementById("search").style.display = 'none';
    document.getElementById("logout").style.display = 'none';
    document.getElementById("songs").style.display = 'none';
    document.getElementById("playlist").style.display = 'none';
    document.getElementById("noPlaylist").style.display = 'none';
    document.getElementById("audioPlayer").style.display = 'none';
}

function afterLogIn() {
    document.getElementById("loginInfo").style.display = 'none';
    document.getElementById("albumCovers").style.display = 'none';
    document.getElementById("marketing").style.display = 'none';
    document.getElementById("search").style.display = 'block';
    document.getElementById("logout").style.display = 'block';
    document.getElementById("songs").style.display = 'block';
    document.getElementById("playlist").style.display = 'none';
    document.getElementById("noPlaylist").style.display = 'none';
    fetchMusic();
    fetchPlaylist();
}
function loggedInFeatures(data) {
    if (data.status) {
        document.getElementById('invalidIpt').innerHTML = data.message;
    } else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        localStorage.setItem('accessToken', data.accessToken);
        afterLogIn();
    }
}

function fetchMusic() {
    document.getElementById("songList").innerHTML = null;
    fetch(`${SERVER_ROOT}/api/music`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(songs => {
            let songList = document.getElementById("songList");
            let count = 1;
            songs.forEach((song) => {
                songList.innerHTML += `<tr>
            <th scope="row">${count}</th>
            <td>${song.title}</td>
            <td>${song.releaseDate}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" id="addBtn" data-music="${song.id}" onclick="addToPlaylist(this)" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg></td>
        </tr>`
                count++;
            }
            );
        });
}

/* ==================================== Fetching Playlist ================================================================= */
function fetchPlaylist() {
    document.getElementById("mySongs").innerHTML = null;
    fetch(`${SERVER_ROOT}/api/playlist`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(songs => {
            let mySongs = document.getElementById("mySongs");
            if (!songs.length) {
                document.getElementById("noPlaylist").style.display = 'block';
                document.getElementById("playlist").style.display = 'none';
            } else {
                document.getElementById("noPlaylist").style.display = 'none';
                document.getElementById("playlist").style.display = 'block'
                songs.forEach((song) => {
                    mySongs.innerHTML += `<tr>
                    <th scope="row">${song.orderId}</th>
                    <td>${song.title}</td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" id="removeBtn" data-playlist="${song.songId}" onclick="removeToPlaylist(this)" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                  </svg>
                  </svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" id="playBtn" data-song="${song.urlPath}" data-current="${song.orderId}" data-title="${song.title}" onclick="playMusic(this)" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                </svg></td>
                </tr>`
                });
            }
        });
}
function addToPlaylist(obj) {
    let songId = obj.getAttribute("data-music");
    fetch(`${SERVER_ROOT}/api/playlist/add`, {
        method: 'POST',
        body: JSON.stringify({
            songId,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    fetchPlaylist();
}

function removeToPlaylist(obj) {
    let songId = obj.getAttribute("data-playlist");
    fetch(`${SERVER_ROOT}/api/playlist/remove`, {
        method: 'POST',
        body: JSON.stringify({
            songId,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    fetchPlaylist();
}

function search() {
    let songToSearch = document.getElementById("searchBar").value;
    let songList = document.getElementById("songList");
    if (!songToSearch) {
        afterLogIn();
        document.getElementById("noSongFound").style.display = "none";
    } else {
        songList.innerHTML = null;
        fetch(`${SERVER_ROOT}/api/music/?search=${songToSearch}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    document.getElementById("noSongFound").style.display = "block";
                } else {
                    let count = 1;
                    data.forEach(song => {
                        songList.innerHTML += `<tr>
                        <th scope="row">${count}</th>
                        <td>${song.title}</td>
                        <td>${song.releaseDate}</td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" id="addBtn" data-music="${song.id}" onclick="addToPlaylist(this)" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                      </td>
                    </tr>`;
                        count++;
                    })
                }
            });
    }
    document.getElementById("searchBar").value = "";
}

function playMusic(obj) {
    if (mode == "repeatAll") {
        document.getElementById("repeat").style.backgroundColor = '';
        document.getElementById("shuffle").style.backgroundColor = '';
    } else if (mode == "shuffle") {
        document.getElementById("repeat").style.backgroundColor = '';
        document.getElementById("repeatAll").style.backgroundColor = ''
    } else if (mode == "repeat") {
        document.getElementById("shuffle").style.backgroundColor = '';
        document.getElementById("repeatAll").style.backgroundColor = ''
    }
    let song = obj.getAttribute("data-song");
    let currentSongId = obj.getAttribute("data-current");
    let title = obj.getAttribute("data-title");
    document.getElementById("title").innerHTML = `${currentSongId}. ${title}`;
    document.getElementById("title").style.display = 'block';
    document.getElementById("audioPlayer").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-skip-backward-circle-fill" viewBox="0 0 16 16" id="prev" data-current="${currentSongId}" onclick="playPrev(this)">
    <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.79-2.907L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.79-.407z" />
</svg>
<div id="audioPlayer2" class="col-8">
    <audio controls id="player" onended="checkmode(${currentSongId})" src="${SERVER_ROOT}/${song}">
    </audio>
</div>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-skip-forward-circle-fill " viewBox="0 0 16 16" id="next" data-current="${currentSongId}" onclick="playNext(this)">
    <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L7.5 8.972V10.5a.5.5 0 0 0 .79.407L11 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528L8.29 5.093a.5.5 0 0 0-.79.407v1.528L4.79 5.093z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor" class="col-auto bi bi-arrow-clockwise" viewBox="0 0 16 16" id="repeat" data-current="${currentSongId}" onclick="repeat(this)">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-arrow-repeat" viewBox="0 0 16 16" id="repeatAll" data-current="${currentSongId}" onclick="repeatAll(this)">
    <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
    <path fill-rule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-shuffle" viewBox="0 0 16 16" data-current="${currentSongId}" id="shuffle" onclick="shuffle(this)">
    <path fill-rule="evenodd"
        d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
    <path
        d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
</svg>`;
    document.getElementById("audioPlayer").style.display = ''
    document.getElementById("player").play();
}

function playNext(obj) {
    if (mode != "repeat") {
        if (mode == "repeatAll") {
            let currentSongId = Number(obj.getAttribute("data-current"));
            fetch(`${SERVER_ROOT}/api/playlist`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => response.json())
                .then(songs => {
                    if (currentSongId <= (songs.length - 1)) {
                        playSongWithId(currentSongId);
                    } else {
                        playSongWithId(0);
                    }
                })
        } else if (mode == "shuffle") {
            fetch(`${SERVER_ROOT}/api/playlist`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => response.json())
                .then(songs => {
                    playSongWithId(Math.floor(Math.random() * songs.length))
                })
        }

    } else {
        document.getElementById("player").currentTime = 0;
    }
}

function playPrev(obj) {
    if (mode != "repeat") {
        if (mode == "repeatAll") {
            let currentSongId = obj.getAttribute("data-current");
            fetch(`${SERVER_ROOT}/api/playlist`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => response.json())
                .then(songs => {
                    let nextSong = songs.filter(item => item.orderId == currentSongId - 1);
                    document.getElementById("title").innerHTML = `${nextSong[0].orderId}. ${nextSong[0].title}`;
                    document.getElementById("title").style.display = 'block';
                    document.getElementById("audioPlayer").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
            class="col-auto bi bi-skip-backward-circle-fill" viewBox="0 0 16 16" id="prev" data-current="${nextSong[0].orderId}" onclick="playPrev(this)">
            <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.79-2.907L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.79-.407z" />
        </svg>
        <div id="audioPlayer2" class="col-8">
            <audio controls id="player" onended="checkmode(${nextSong[0].orderId})" src="${SERVER_ROOT}/${nextSong[0].urlPath}">
            </audio>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
            class="col-auto bi bi-skip-forward-circle-fill " viewBox="0 0 16 16" id="next" data-current="${nextSong[0].orderId}" onclick="playNext(this)">
            <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L7.5 8.972V10.5a.5.5 0 0 0 .79.407L11 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528L8.29 5.093a.5.5 0 0 0-.79.407v1.528L4.79 5.093z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor" class="col-auto bi bi-arrow-clockwise" viewBox="0 0 16 16" id="repeat" data-current="${nextSong[0].orderId}" onclick="repeat(this)">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
            class="col-auto bi bi-arrow-repeat" viewBox="0 0 16 16" id="repeatAll" data-current="${nextSong[0].orderId}" onclick="repeatAll()"  >
            <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
            class="col-auto bi bi-shuffle" viewBox="0 0 16 16" data-current="${nextSong[0].orderId}" id="shuffle" onclick="shuffle(this)">
            <path fill-rule="evenodd"
                d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
            <path
                d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
        </svg>`;
                    document.getElementById("audioPlayer").style.display = ''
                    document.getElementById("player").play();
                });
        } else if (mode == "shuffle") {
            fetch(`${SERVER_ROOT}/api/playlist`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => response.json())
                .then(songs => {
                    playSongWithId(Math.floor(Math.random() * songs.length))
                })
        }
    } else {
        document.getElementById("player").currentTime = 0;
    }
}
function checkmode(orderId) {
    if (mode == "repeatAll") {
        fetch(`${SERVER_ROOT}/api/playlist`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.json())
            .then(songs => {
                if (orderId <= (songs.length - 1)) {
                    repeatAll();
                    playSongWithId(orderId);
                } else {
                    repeatAll();
                    playSongWithId(0);
                }
            })
    } else if (mode == "shuffle") {
        fetch(`${SERVER_ROOT}/api/playlist`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.json())
            .then(songs => {
                playSongWithId(Math.floor(Math.random() * songs.length))
            })
    }
}
function repeat(obj) {
    mode = "repeat";
    obj.style.backgroundColor = "#fa586a";
    document.getElementById("shuffle").style.backgroundColor = '';
    document.getElementById("repeatAll").style.backgroundColor = '';
    document.getElementById("player").loop = true;
}
function repeatAll() {
    mode = "repeatAll";
    document.getElementById("repeat").style.backgroundColor = ''
    document.getElementById("shuffle").style.backgroundColor = '';
    document.getElementById("repeatAll").style.backgroundColor = "#fa586a";
}

function shuffle(obj) {
    mode = "shuffle";
    document.getElementById("repeat").style.backgroundColor = ''
    document.getElementById("repeatAll").style.backgroundColor = '';
    obj.style.backgroundColor = "#fa586a";
}

function playSongWithId(id) {
    fetch(`${SERVER_ROOT}/api/playlist`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(songs => {
            let nextSong = songs.filter(item => item.orderId == id + 1);
            document.getElementById("title").innerHTML = `${nextSong[0].orderId}. ${nextSong[0].title}`;
            document.getElementById("title").style.display = 'block';
            document.getElementById("audioPlayer").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-skip-backward-circle-fill" viewBox="0 0 16 16" id="prev" data-current="${nextSong[0].orderId}" onclick="playPrev(this)">
    <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.79-2.907L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.79-.407z" />
</svg>
<div id="audioPlayer2" class="col-8">
    <audio controls id="player" onended="checkmode(${nextSong[0].orderId})" src="${SERVER_ROOT}/${nextSong[0].urlPath}">
    </audio>
</div>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-skip-forward-circle-fill " viewBox="0 0 16 16" id="next" data-current="${nextSong[0].orderId}" onclick="playNext(this)">
    <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L7.5 8.972V10.5a.5.5 0 0 0 .79.407L11 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528L8.29 5.093a.5.5 0 0 0-.79.407v1.528L4.79 5.093z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor" class="col-auto bi bi-arrow-clockwise" viewBox="0 0 16 16" id="repeat" data-current="${nextSong[0].orderId}" onclick="repeat(this)">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-arrow-repeat" viewBox="0 0 16 16" id="repeatAll" data-current="${nextSong[0].orderId}" onclick="repeatAll(this)">
    <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
    <path fill-rule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor"
    class="col-auto bi bi-shuffle" viewBox="0 0 16 16" data-current="${nextSong[0].orderId}" id="shuffle" onclick="shuffle(this)">
    <path fill-rule="evenodd"
        d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
    <path
        d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
</svg>`;
            document.getElementById("audioPlayer").style.display = ''
            document.getElementById("player").play();
        });
}
