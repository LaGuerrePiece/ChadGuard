//CONNECTION MODULE

var loggedin = false;
var username;

chrome.storage.sync.get(['username'], function(data) {
    username = data.username;
});

function checkLoginStatus() {
    chrome.storage.sync.get(['discord_token', 'username'], function(data) {
        document.getElementById("login_status").value = data;
        if ('discord_token' in data) {
            getUsername(data.discord_token.access_token);
            loggedin = true;
            document.getElementById("loginwithdiscord").innerHTML = "Logout";
            document.getElementById("login_status").innerHTML = username;
            document.getElementById("login").classList.remove('notloggedin');
            document.getElementById("login").classList.add('loggedin');
        } else {
            loggedin = false;
            document.getElementById("loginwithdiscord").innerHTML = "Login with Discord";
            document.getElementById("login_status").innerHTML = "";
            document.getElementById("login").classList.remove('loggedin');
            document.getElementById("login").classList.add('notloggedin');
        }
    });
}

checkLoginStatus();

function getUsername(token) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://discordapp.com/api/users/@me", true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            username = JSON.parse(xhr.responseText).username;
            if(username === undefined) {
                return;
            }
            document.getElementById("login_status").innerHTML = username;
            chrome.storage.sync.set({ username: username });
        }
    };
    xhr.send();
}

function getToken(code) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://discordapp.com/api/oauth2/token", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            chrome.storage.sync.set({ discord_token: JSON.parse(xhr.responseText)}, function() {
                checkLoginStatus();
            });
        }
    };
    xhr.send("client_id=945674310461313087&client_secret=tWD4eQ7yT7f6wUk56NN7SDljcPgetWGv&code=" + code + "&redirect_uri=" + chrome.identity.getRedirectURL() + "&scope=identify&grant_type=authorization_code");
}

console.log(chrome.identity.getRedirectURL())
document.getElementById("loginwithdiscord").addEventListener("click", function(){
    if (loggedin) {
        logout();
    } else {
        login();
    }
});


function login() {
    var url = "https://discordapp.com/api/oauth2/authorize?client_id=945674310461313087&redirect_uri=" + chrome.identity.getRedirectURL() + "&response_type=code&scope=identify%20guilds";
    chrome.identity.launchWebAuthFlow({url: url, interactive: true}, function(res){
        var url = new URL(res);
        console.log(res)
        var code = url.searchParams.get("code");
        getToken(code);
    });
}

function logout() {
    chrome.storage.sync.remove(['discord_token', 'username'], function() {
        loggedin = false;
        checkLoginStatus();
    });
}

//AUTRES MODULES :

displayscore()



function displayscore() {

    var query = { active: true, currentWindow: true };
    function callback(tabs) {
        var currentTab = tabs[0];
        console.log(currentTab.id);
        chrome.storage.local.get(['scores'], function(result) {
            let currentScore = result.scores[currentTab.id]
            document.getElementById("pScore").innerHTML = Math.round(currentScore*100);
        })
    }
    chrome.tabs.query(query, callback);
}

//Add to banned URLs
function addToBannedURLs(urlToAdd) {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        bannedURLs.push(urlToAdd)
        bannedURLs = [...new Set(bannedURLs)];
        chrome.storage.local.set({bannedURLs});
    });
}
//Remove from banned URLs
function removeFromBannedURLs(urlToRemove) {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        let index = bannedURLs.indexOf(urlToRemove)
        if (index == - 1) {console.log("cette URL n'était pas là de base !")} else {
            bannedURLs.splice(index, 1)
        }
        chrome.storage.local.set({bannedURLs});
    });
}

//choose BlockPage preference
document.addEventListener('DOMContentLoaded', function() {
    let BlockPageChoiceOne = document.getElementById('BlockPageChoiceOne');
    BlockPageChoiceOne.addEventListener('click', function() {
        chrome.storage.local.set({choice: 1});
    });
    let BlockPageChoiceTwo = document.getElementById('BlockPageChoiceTwo');
    BlockPageChoiceTwo.addEventListener('click', function() {
        chrome.storage.local.set({choice: 2});
    });
    let BlockPageChoiceThree = document.getElementById('BlockPageChoiceThree');
    BlockPageChoiceThree.addEventListener('click', function() {
        chrome.storage.local.set({choice: 3});
    });
}); 