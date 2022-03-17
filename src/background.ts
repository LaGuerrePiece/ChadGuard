console.log("service worker running");

//Initialisation de la defaultBlocklist :
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(['defaultBlocklist'], function(result) {
    let defaultBlocklist = result.defaultBlocklist ?? []
    const url = chrome.runtime.getURL('./defaultBlocklist.json');
    fetch(url)
        .then((response) => response.json())
        .then((json) => MiseAJour(json, defaultBlocklist));

    function MiseAJour(urls: string[], defaultBlocklist: string[]) {
        console.log(urls)
        urls.forEach((e) => {defaultBlocklist.push(e)})
        defaultBlocklist = [...new Set(defaultBlocklist)]
        chrome.storage.local.set({defaultBlocklist: defaultBlocklist}, function() {
            console.log('Value 89 for instance is set to ' + defaultBlocklist[89]);
        });
    }
  });
  chrome.storage.sync.set({
    blockingType: 0,
    aiFiltering: true,
    visitCount: 0,
    dayCounter: false,
    dayCounterValue: 0,
    noseEggUnlock: false,
    lastPactDate: 1647527774447
  });
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == 'closeIt') {
    console.log('Received order to close you !')
    // @ts-expect-error I promise I will learn ts later
    chrome.tabs.remove(sender.tab.id)
  }
});

