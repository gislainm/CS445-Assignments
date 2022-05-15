"use strict";
/*eslint-disable */
const SERVER_ROOT = 'http://localhost:3000';

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
          </svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" id="playBtn" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
        </svg></td>
        </tr>`
                count++;
            }
            );
        });
}

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
            } else {
                document.getElementById("playlist").style.display = 'block'
                songs.forEach((song) => {
                    mySongs.innerHTML += `<tr>
                    <th scope="row">${song.orderId}</th>
                    <td>${song.title}</td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" id="removeBtn" data-playlist="${song.songId}" onclick="removeToPlaylist(this)" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                  </svg>
                  </svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" id="playBtn" viewBox="0 0 16 16">
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

function playMusic() {
    let songName = document.getElementById("searchBar").value;
}

