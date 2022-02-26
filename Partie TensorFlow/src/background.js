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
