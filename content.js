var ifrm = document.createElement("iframe");
let iframe = chrome.runtime.getURL('sandbox.html');
document.body.append(iframe)

window.onload = sendIt()

function sendIt() {
    var imgsArray = img_find()
    console.log('src numéro 0 : ' + imgsArray[0])
    console.log('liste des srcs : ' + imgsArray)
    
    chrome.runtime.sendMessage({greeting: "Analyse donc ces srcs", imgs: imgsArray}, function(response) {
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

