let tabUrl = location.href
let treeshold = 0.2
var webHookUrl = "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";


window.onload = checkBlacklisted()

function checkBlacklisted() {
    chrome.storage.local.get(['bannedURLs'], function(result) {
        let bannedURLs = result.bannedURLs
        if (bannedURLs.includes(tabUrl)) {
            block()
        } else {
            img_find()
        }
    })
}


function img_find() {
    //Chopper toutes les images
    var imgs = document.getElementsByTagName("img");
    if (imgs.length) {
        console.log('length avant suppression', imgs.length)
        let imgArray = []
        for (let i = 0; i < imgs.length; i++) {
            imgArray[i] = new Image()
            //imgArray[i].crossOrigin = "anonymous"
            if (imgs[i].hasAttribute('src')) {imgArray[i].src = imgs[i].getAttribute('src')}
            if (imgs[i].hasAttribute('srcset')) {imgArray[i].srcset = imgs[i].getAttribute('srcset')}
            if (imgs[i].hasAttribute('data-lazy')) {imgArray[i]['data-lazy'] = imgs[i].getAttribute('data-lazy')}
            if (imgs[i].hasAttribute('data-srcset')) {imgArray[i]['data-srcset'] = imgs[i].getAttribute('data-srcset')}
            if (imgs[i].hasAttribute('data-src')) {imgArray[i]['data-src'] = imgs[i].getAttribute('data-src')}

            imgArray[i].width = imgs[i].clientWidth
            imgArray[i].height = imgs[i].clientHeight
            console.log(imgArray[i].src)
            //if (imgArray[i].width == 0 || imgArray[i].height == 0) {imgArray.splice(i, 1); i--}

            //if (!imgs[i].hasAttribute('width')) {imgs[i].setAttribute('width', imgs[i].clientWidth)}
            //if (!imgs[i].hasAttribute('height')) {imgs[i].setAttribute('height', imgs[i].clientHeight)}
            //imgs[i].setAttribute('crossOrigin', 'anonymous')
            //if (imgs[i].getAttribute('width') == "0" || imgs[i].getAttribute('height') == "0") {imgs[i].remove(); i--}
        }
        imgArray = imgArray.filter(function(item) {
            if (item.src == "null" || item.src == null || item.width == 0 || item.height == 0) {
                return false
            } else {
                return true
            }
        })
        console.log('length après suppression', imgArray.length)
        let elements = [...imgArray]
        elements.forEach(e => console.log(e))
        //Evaluer chaque image
        let promiseArray = []
        nsfwjs.load().then((model) => {
            for (var i = 0; i < elements.length; i++) {
                promiseArray[i] = new Promise((resolve) => {
                    resolve(model.classify(elements[i]))
                });
            }
            Promise.all(promiseArray).then((values) => {
                console.log(values);
                var score = getScore(values)
                addToChromeStorage(score)

                console.log(`pornScore : ${score}`)
                if (score > treeshold) {
                    console.log('Seems like porn !')
                    block()
                    //sendToDiscord(username, tabUrl)
                } else {
                    console.log('All seems fine.')
                }
            });
        });
    } else {addToChromeStorage(0)}
}

function getScore(values) {
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
    return pScore
}

function addToChromeStorage(score) {
    // chrome.storage.local.get(['scores'], function(result) {
    //     let scores = result.scores ?? {}
    //     scores[tabUrl] = score
    //     chrome.storage.local.set({scores: scores}, function() {
    //         console.log('scores : ' + JSON.stringify(scores));
    //     });
    // });
}

function block() {
    PUNISH(username)
    location.replace('chrome-extension://' + chrome.runtime.id + '/blockpage.html')
    
}



//MODULE WEBHOOK :

function PUNISH(username) {                             //Mettre à jour username sur cette page
    url = url.replace('https://', '')
    url = url.replace('/', '')
    postToWebhook("**" + username + "** vient de trahir son chad intérieur sur : " + tabUrl + ".");
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










