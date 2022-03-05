var loggedin = false;
var username;


//If the username is in chrome storage, get it
chrome.storage.sync.get(['username'], function(data) {
    username = data.username;
});

//Are the login info in chrome storage ? if yes, log him in. If not, ask him to log in
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
            chrome.extension.getBackgroundPage().console.log(xhr.responseText);
            var username = JSON.parse(xhr.responseText).username;
            if(username === undefined) {
                return;
            }
            chrome.storage.sync.set({ username: username }, function() {
                chrome.runtime.sendMessage({type: 'update',  update: 1}, function(response) {
                });
            });
            document.getElementById("login_status").innerHTML = JSON.parse(xhr.responseText).username;
            username = JSON.parse(xhr.responseText).username;
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
    xhr.send("client_id=945674310461313087&client_secret=tWD4eQ7yT7f6wUk56NN7SDljcPgetWGv&code=" + code + "&scope=identify&grant_type=authorization_code");
}

document.getElementById("loginwithdiscord").addEventListener("click", function(){
    if (loggedin) {
        logout();
    } else {
        login();
    }
});


function login() {
    var url = "https://discordapp.com/api/oauth2/authorize?client_id=945674310461313087&response_type=code&scope=identify%20guilds";
    chrome.identity.launchWebAuthFlow({url: url, interactive: true}, function(res){
        var url = new URL(res);
        chrome.extension.getBackgroundPage().console.log(res);
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



chrome.tabs.query({active: true, currentWindow: true},function(tabs){
    var currentTabUrl = tabs[0].url;
    console.log(currentTabUrl)
    chrome.storage.sync.get(['url'], function(result) {
        console.log('Value currently is ' + result);
        console.log('Value currently is ' + result.url);
    });
});

//{url: 'stackoverflow.com/questions/14531102/saving-and-retrieving-from-chrome-storage-sync', score: '0.55'}

//var currentScore = localStorage.getItem(currentTab.url); 
//document.getElementById("pScore").innerHTML = Math.round(currentScore*100);

// chrome.runtime.onMessage.addListener(function(message) {
//     if ('instruction' in message) {
//         var score = localStorage.getItem('scores');
//         var currentScore = score.currentTab.url
//         document.getElementById("pScore").innerHTML = Math.round(currentScore*100);
//     }
// })

// chrome.runtime.sendMessage({greeting: "requesting score"}, function(response) {
//     console.log('Réponse : ' + response)
// });