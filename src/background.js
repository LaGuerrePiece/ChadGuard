var username = "";
var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";
var treeshold = 0.5

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

//MODULE D'ANALYSE :

function analyse(imgSrcs, tabUrl) {
    var imgArray = []
    for (var i = 0; i < imgSrcs.length; i++) {
        imgArray[i] = new Image(100, 100);
        imgArray[i].src = imgSrcs[i]
        imgArray[i].crossOrigin = "anonymous";
    }

    var promiseArray = []
    nsfwjs.load().then((model) => {
        for (var i = 0; i < imgArray.length; i++) {
            promiseArray[i] = new Promise((resolve, reject) => {
                resolve(model.classify(imgArray[i]))
            });
        }
        Promise.all(promiseArray).then((values) => {
            //console.log(values);
            decide(values, tabUrl)
        });
    });
}

function decide(values, tabUrl) {
    let pScore = 0

    function incrementPScore(value) {
        for (let i = 0; i < 5; i++) {
            if (value[i].className == 'Porn') {
                pScore += value[i].probability
            }
        }
    }

    values.forEach(value => incrementPScore(value));
    pScore = pScore/values.length
    
    chrome.runtime.sendMessage({ score: pScore });
    //var popup = chrome.extension.getViews({type: "popup"});
    //popup.getElementById("pScore").innerHTML = "pScore : " + pScore;



    console.log(`pornScore : ${pScore}`)
    if (pScore > treeshold) {
        console.log('Seems like porn !')
        sendToDiscord(username, tabUrl)
    } else {
        console.log('All seems fine.')
    }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting == "Analyse donc ces srcs") {
        console.log('Sender tab url : ' + sender.tab.url);
        analyse(request.imgs, sender.tab.url)
    }
    if (request.greeting == "requesting score") {
        sendResponse({pScore : pScore})
        console.log(pScore)
    }


    //sendResponse({farewell: "ok ici le background script", autre: 'lalala'});
    //return true;
});



//MODULE WEBHOOK :

function sendToDiscord(username, url) {
    url = url.replace('https://', '')
    url = url.replace('/', '')
    postToWebhook("**" + username + "** vient de trahir son chad intérieur sur : " + url + ".");
}

function postToWebhook(content) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', webHookUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    data = {
        content: content,
    }

    xhr.send(JSON.stringify(data));
    xhr.onload = function(res) {
        console.log('posted: ', res);
    }
    xhr.onerror = function(res) {
        console.log('error posting: ', res);
    }
}
