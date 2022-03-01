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



window.onload = sendIt()

function sendIt() {
    var imgsArray = img_find()
    console.log('src numéro 0 : ' + imgsArray[0])
    console.log('liste des srcs : ' + imgsArray)
    
    chrome.runtime.sendMessage({greeting: "Salut, c'est le content script, voilà les srcs", imgs: imgsArray}, function(response) {
        //console.log(response.farewell);
    })
}

function img_find() {
    var imgs = document.getElementsByTagName("img");
    var imgSrcs = [];
    if (imgs.length > 0) {
        //Push dans imgSrcs toutes les images de la page :
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].getAttribute('src') !== null) {
                if (imgs[i].getAttribute('src') !== "") {
                    imgSrcs.push(imgs[i].src);
                    console.log('src!')
                }
            } else if (imgs[i].getAttribute('srcset') !== null) {
                imgSrcs.push(imgs[i].currentSrc);
                console.log('srcset!')
            } else if (imgs[i].getAttribute('data-lazy') !== null) {
                imgSrcs.push(imgs[i].getAttribute('data-lazy'));
                console.log('datalazy!')
            } else if (imgs[i].getAttribute('data-srcset') !== null) {
                imgSrcs.push(imgs[i].getAttribute('data-srcset').split(" ")[0]);
                console.log('data-srcset!')
            } else if (imgs[i].getAttribute('data-src') !== null) {
                imgSrcs.push(imgs[i].getAttribute('data-src'));
                console.log('data-src!')
            } else {
                console.log('une image na eu ni lun ni lautre')
            }
        }
        
        //Supprime lorsque l'url de l'image commence par un '/' :
        for (var i = 0; i < imgSrcs.length; i++) {
            if (imgSrcs[i][0] == '/') {
                imgSrcs.splice(i, 1);
                i--
            }
        }

        //Supprime les doublons :
        var imgSrcs = [...new Set(imgSrcs)];
        console.log('après suppression : ')
        console.log('imgSrc length : ' + imgSrcs.length)
        imgSrcs.forEach(e => console.log(e))

        //Problème : met plusieurs fois quand même img mais != url comme sur : https://github.com/tensorflow/tfjs/issues/322
        //Ne fait pas encore les vidéos
    }
    return imgSrcs;
}








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