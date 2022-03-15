console.log("service worker running");

//Initialisation de la blocklist :
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(['blocklist'], function(result) {
    let blocklist = result.blocklist ?? []
    const url = chrome.runtime.getURL('./defaultBlocklist.json');
    fetch(url)
        .then((response) => response.json())
        .then((json) => MiseAJour(json, blocklist));

    function MiseAJour(urls: string[], blocklist: string[]) {
        console.log(urls)
        urls.forEach((e) => {blocklist.push(e)})
        blocklist = [...new Set(blocklist)]
        chrome.storage.local.set({blocklist: blocklist}, function() {
            console.log('Value 89 for instance is set to ' + blocklist[89]);
        });
    }
  });
  chrome.storage.local.set({"scores": {}, "choice": 1, 'ai': 1})
});

// interface sender {
//   tab: object
// }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // @ts-expect-error promise I will learn ts
  if (request.message == 'closeIt') chrome.tabs.remove(sender.tab.id)
});



// function getScore(values: PromiseSettledResult<nsfwjs.predictionType>[]) {
//     let pScore = 0;
//     console.log(values)
//     for (let i = 0; i < values.length; i++) {
//         const value = values[i]
//         if (value.status == "fulfilled") {
//             for (let i = 0; i < 5; i++) {
//               if (value.value.className == "Porn") {
//                 //pScore += value.value[i].probability;
//               }
//             }
//             console.log(value)
//         }
//     }
//     pScore = pScore / values.length;
//     return pScore;
// }
