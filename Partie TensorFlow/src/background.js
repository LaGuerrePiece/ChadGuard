//MODULE DE CONNECTION :
var username = "";

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

//NSFWJS et Webhook :

var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";

// function img_analyse() {
    
//     var predictionArray = []
//     var imgs = document.getElementsByTagName("img");
//     for (var i = 0; i < imgs.length; i++) {
//         nsfwjs.load().then((model) => {
//         model.classify(imgs[i]).then((predictions) => {
//             predictionArray.push(predictions)
//             console.log("Predictions", predictions);
//             window.alert("Predictions ", predictions)
//         });
//         })
//     }
//     return predictionArray
// }

function test() {
    var predictionArray = []
    var img = new Image()
    img.url = "https://static.actu.fr/uploads/2019/10/poney-metro-paris-ratp-ligne-5-italie.jpeg"
    nsfwjs.load().then((model) => {
    model.classify(img).then((predictions) => {
        predictionArray.push(predictions)
        console.log("Predictions", predictions);
        window.alert("Predictions ", predictions)
    });
    })
    return predictionArray
}

function sendToDiscord(predictionArray) {
    postToWebhook("** voilà les scores : **" + predictionArray.join());
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

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
    var img = new Image()
    img.url = "https://static.actu.fr/uploads/2019/10/poney-metro-paris-ratp-ligne-5-italie.jpeg"
    nsfwjs.load().then((model) => {
    model.classify(img).then((predictions) => {
        console.log("Predictions", predictions);
        window.alert("Predictions ", predictions)
    });
    })
    }
})

//window.onload = sendToDiscord(img_analyse())
// window.onload = sendToDiscord(test())







// OTHER SOURCE :

// import * as nsfwjs from 'nsfwjs'

// const img = document.getElementById('img')

// // Load model from my S3.
// // See the section hosting the model files on your site.
// const model = await nsfwjs.load()

// // Classify the image
// const predictions = await model.classify(img)
// console.log('Predictions: ', predictions)





// chrome.contextMenus.onClicked.addListener(function(info) {
//     window.alert(`jai cliqué! infos : ${info.srcUrl}`)


//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     //img.src = "https://i.imgur.com/HTC6pN8.jpeg";
//     img.src = info.srcUrl;

//     nsfwjs.load().then((model) => {
//     model.classify(img).then((predictions) => {
//         console.log("Predictions", predictions);
//         window.alert("Predictions ", predictions)
//     });
//     })
// });
