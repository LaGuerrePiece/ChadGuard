//Initialisation de la Blacklist :
//Gets bannedURLs from storage, adds those from json, deletes copies, sets in storage
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs ?? []
        const url = chrome.runtime.getURL('./urls.json');
        fetch(url)
            .then((response) => response.json())
            .then((json) => MiseAJour(json.URLS, bannedURLs));

        function MiseAJour(urls, bannedURLs) {
            console.log(urls)
            urls.forEach((e) => {bannedURLs.push(e)})
            bannedURLs = [...new Set(bannedURLs)]
            chrome.storage.local.set({bannedURLs: bannedURLs}, function() {
                console.log('Value is set to ' + bannedURLs[89]);
            });
        }
    });
    chrome.storage.local.set({"scores": {}, "choice": 2, 'ai': 1})
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('score : ', request.score)
    console.log('sender : ', sender.tab.id)
    chrome.storage.local.get(['scores'], function(result) {
        let scores = result.scores
        scores[sender.tab.id] = request.score
        chrome.storage.local.set({scores});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'closeIt') chrome.tabs.remove(sender.tab.id)
});


