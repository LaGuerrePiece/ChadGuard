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
    // let idsToUrls = {}
    // chrome.storage.local.set({idsToUrls});
});

function addToBannedURLs(urlToAdd) {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        bannedURLs.push(urlToAdd)
        bannedURLs = [...new Set(bannedURLs)];
        chrome.storage.local.set({bannedURLs}, function() {});
    });
}

//When tab is updated, if it existed before, delete score associated with old url
//Then, set the new url in the id to url tracker
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//         chrome.storage.local.get(['idsToUrls', 'scores'], function(a) {
//             let idsToUrls = a.idsToUrls
//             let scores = a.scores
//             console.log(idsToUrls)
//             if (idsToUrls[tabId]) {
//                 delete scores[idsToUrls[tabId]]
//             }
//             idsToUrls[tabId] = changeInfo.url
//             chrome.storage.local.set({scores, idsToUrls});
//         });
//     }
// });

//When tab is closed, removes score and id to url tracker
// chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
//     chrome.storage.local.get(['idsToUrls', 'scores'], function(a) {
//         let idsToUrls = a.idsToUrls
//         let scores = a.scores
//         delete scores[idsToUrls[tabId]]
//         delete idsToUrls[tabId]
//         chrome.storage.local.set({scores, idsToUrls});
//     });
// });





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



