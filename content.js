//let score = 0;

//console.log(chrome.declarativeNetRequest);

// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     console.log(details);
//   },
//   { urls: ["*"] }
// );

let tabUrl = location.href;
let treeshold = 0.2;
var webHookUrl =
  "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";

window.onload = checkBlacklisted();

function checkBlacklisted() {
  chrome.storage.local.get(["bannedURLs", "ai"], function (result) {
    let bannedURLs = result.bannedURLs ?? [];
    if (bannedURLs.some((e) => tabUrl.includes(e))) {
      block();
    } else if (result.ai === 1) {
      analysePage();
    } else {
      console.log("page not analysed because ai = 0");
    }
  });
}

// function getBase64Image(img) {
//   // Create an empty canvas element
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;

//   // Copy the image contents to the canvas
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);

//   // Get the data-URL formatted image
//   // Firefox supports PNG and JPEG. You could check img.src to
//   // guess the original format, but be aware the using "image/jpg"
//   // will re-encode the image.
//   var dataURL = canvas.toDataURL("image/png");

//   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

// const analysePage = async () => {
//   var imgs = [...document.getElementsByTagName("img")];
//   console.log(`Found ${imgs.length} images on page`);

//   // const nsfwModel = await nsfw.load();

//   for (let i = 0; i < imgs.length; i++) {
//     const img = imgs[i];
//     const imgWidth = img.clientWidth;
//     const imgHeight = img.clientHeight;

//     if (imgWidth === 0 || imgHeight === 0) {
//       imgs.splice(i, 1);
//       i--;
//     }

//     // set img src as base64
//     //imgs[i].src = getBase64Image(img);
//   }

//   nsfwjs.load().then((model) => {
//     console.log("Loaded nsfwjs model");
//     console.log("Getting predictions and score...");
//     const promiseArray = imgs.map((img) => {
//       return new Promise((resolve, reject) => {
//         resolve(model.classify(img));
//       });
//     });
//     Promise.allSettled(promiseArray).then((predictions) => {
//       for (let i = 0; i < predictions.length; i++) {
//         console.log(predictions[i], imgs[i]);
//       }
//       let score = getScore(predictions);
//       console.log(`pornScore : ${score}`);
//       addToSessionStorage(score);
//       punition(score);
//     });
//   });
function analysePage() {
  var imgs = [...document.getElementsByTagName("img")];
  console.log(`Found ${imgs.length} images on page`);
  //   for (let i = 0; i < imgs.length; i++) {
  //     console.log("img :", imgs[i]);
  //   }
  if (imgs.length > 0) {
    for (let i = 0; i < imgs.length; i++) {
      if (!imgs[i].getAttribute("width")) {
        imgs[i].setAttribute("width", imgs[i].clientWidth);
      }
      if (!imgs[i].getAttribute("height")) {
        imgs[i].setAttribute("height", imgs[i].clientHeight);
      }
      imgs[i].setAttribute("crossorigin", "anonymous");
    }
    for (let i = imgs.length - 1; i >= 0; --i) {
      if (
        imgs[i].getAttribute("width") == 0 ||
        imgs[i].getAttribute("height") == 0
      ) {
        imgs[i].remove();
      }
    }
    console.log("length après purge :", imgs.length);
    let elements = [...imgs];
    //elements.forEach(e => console.log(e))
    //Evaluer chaque image
    let promiseArray = [];
    nsfwjs.load().then((model) => {
      for (let i = 0; i < elements.length; i++) {
        promiseArray[i] = new Promise((resolve, reject) => {
          resolve(model.classify(elements[i]));
        });
      }
      Promise.allSettled(promiseArray).then((values) => {
        // for (let i = 0; i < values.length; i++) {
        //   console.log(values[i], elements[i]);
        // }
        let score = getScore(values);
        console.log(`pornScore : ${score}`);
        addToSessionStorage(score);
        punition(score);
      });
    });
  } else {
    addToSessionStorage(0);
  }
}

function punition(score) {
  if (score > treeshold) {
    console.log("Seems like porn !");
    PUNISH();
  } else {
    console.log("All seems fine.");
  }
}

function getScore(values) {
  let pScore = 0;
  function incrementPScore(value) {
    if (value.status == "fulfilled") {
      for (let i = 0; i < 5; i++) {
        if (value.value[i].className == "Porn") {
          pScore += value.value[i].probability;
        }
      }
    }
  }
  values.forEach((value) => incrementPScore(value));
  pScore = pScore / values.length;
  return pScore;
}

function addToSessionStorage(score) {
  chrome.runtime.sendMessage({ score: score }, function (response) {
    console.log(`score ${score} envoyé`);
  });
}

function block() {
  chrome.storage.local.get(["choice"], function (result) {
    if (result.choice == 3) {
      chrome.runtime.sendMessage({ message: "closeIt" });
    } else {
      location.replace(
        "chrome-extension://" + chrome.runtime.id + "/blockpage.html"
      );
    }
  });
}

//MODULE WEBHOOK :

function PUNISH() {
  url = tabUrl.replace("https://", "");
  //url = url.replace('/', '')
  chrome.storage.sync.get(["username"], function (data) {
    if (data.username) {
      postToWebhookThenBlock(
        "**" +
          data.username +
          "** vient de trahir son chad intérieur sur : " +
          url +
          "."
      );
    } else {
      postToWebhookThenBlock(
        "**un personnage non-identifié** vient de trahir son chad intérieur sur : " +
          url +
          "."
      );
      console.log("Triché mais pas connecté !");
    }
  });
}

function postToWebhookThenBlock(content) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", webHookUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  data = {
    content: content,
  };

  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    block();
  };
  xhr.onerror = function (res) {
    console.log("error posting: ", res);
    block();
  };
}
