chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: 'sendlinktodiscord',
        title: "I watch p0rn",
        contexts:["image", "video"],
    });
});
//Manually input :
var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";
var username = "";

var webhook_is_valid = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({});
    if (request.type == 'set_webhook_valid') {
        webhook_is_valid = request.valid;
        console.log(request, webhook_is_valid);
    }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    sendlinktodiscord(info);
});

function sendlinktodiscord(info) {
    postToWebhook("**" + username + "** has betrayed his inner chad on : " + info.pageUrl);
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