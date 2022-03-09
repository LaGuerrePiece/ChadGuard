var username = "";

//Initialisation de la Blacklist :

//Gets bannedURLs from storage, adds those from json, deletes copies, sets in storage
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        if (!bannedURLs) {bannedURLs == []}
        const url = chrome.runtime.getURL('./urls.json');
        fetch(url)
            .then((response) => response.json())
            .then((json) => MiseAJour(json.URLS, bannedURLs));

        function MiseAJour(urls, bannedURLs) {
            console.log(urls)
            urls.forEach((e) => {bannedURLs.push(e)})
            bannedURLs = [...new Set(bannedURLs)];
            chrome.storage.local.set({bannedURLs: bannedURLs}, function() {
                console.log('Value is set to ' + bannedURLs);
            });
        }
    });
});

function addToBannedURLs(urlToAdd) {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        bannedURLs.push(urlToAdd)
        bannedURLs = [...new Set(bannedURLs)];
        chrome.storage.local.set({bannedURLs}, function() {});
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('score : ', request.score)
    console.log('sender : ', sender.tab.id)
    chrome.storage.local.get(['scores'], function(result) {
        let scores = result.scores ?? {}
        scores[sender.tab.id] = request.score
        chrome.storage.local.set({scores});
    });
});

//MIGRATION : https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/

//MODULE DE CONNECTION :

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({});
    if (request.type == 'update') {
        refreshVars();
    }
});

function refreshVars() {
    chrome.storage.sync.get('username', function(data) {
        username = data.username;
        console.log("username: " + username);
    });
}

refreshVars();
console.log(chrome.identity.getRedirectURL());



