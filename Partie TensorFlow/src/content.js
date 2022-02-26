//const model = await nsfwjs.load('/model/usedindemo/')
// var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";

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

// function test() {
//     var predictionArray = []
//     var img = new Image()
//     img.url = "https://static.actu.fr/uploads/2019/10/poney-metro-paris-ratp-ligne-5-italie.jpeg"
//     nsfwjs.load().then((model) => {
//     model.classify(img).then((predictions) => {
//         predictionArray.push(predictions)
//         console.log("Predictions", predictions);
//         window.alert("Predictions ", predictions)
//     });
//     })
//     return predictionArray
// }

// function sendToDiscord(predictionArray) {
//     postToWebhook("** voilà les scores : **" + predictionArray.join());
// }

// function postToWebhook(content) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', webHookUrl, true);
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
//     data = {
//         content: content,
//     }

//     xhr.send(JSON.stringify(data));

//     xhr.onload = function(res) {
//         console.log('posted: ', res);
//     }

//     xhr.onerror = function(res) {
//         console.log('error posting: ', res);
//     }
// }

// //window.onload = sendToDiscord(img_analyse())
// window.onload = sendToDiscord(test())






















// async function main() {
    
// }

// main();


// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//         id: 'analyseImage',
//         title: "Analyse this image !",
//         contexts:["image"],
//     });
// });

// chrome.contextMenus.onClicked.addListener(function(info) {
//     window.alert(`jai cliqué! infos : ${info.srcUrl}`)

//     const img = new Image();
//     //img.src = "https://i.imgur.com/HTC6pN8.jpeg";

// });


// function img_analyse(imgSrcs) {
//     imgSrcs
//     img.src = info.srcUrl;

//     nsfwjs.load().then((model) => {
//     model.classify(img).then((predictions) => {
        
//         console.log("Predictions", predictions);
//         window.alert("Predictions ", predictions)
//     });
//     })
// }
// function img_find() {
//     var imgs = document.getElementsByTagName("img");
//     var imgSrcs = [];

//     for (var i = 0; i < imgs.length; i++) {
//         imgSrcs.push(imgs[i].src);
//     }
//     console.log(imgSrcs)
//     return imgSrcs;
// }

// window.onload = img_analyse(img_find())










// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//     sendlinktodiscord(info);
// });

// function sendlinktodiscord(info) {
//     postToWebhook("**" + username + "** has betrayed his inner chad on : " + info.pageUrl);
// }

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//         id: 'sendlinktodiscord',
//         title: "I watch p0rn",
//         contexts:["image", "video"],
//     });
// });