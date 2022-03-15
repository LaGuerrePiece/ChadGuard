console.log("content script running");

const tabUrl = location.href;
const treeshold = 0.5;
const webHookUrl =
  "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";

  // @ts-expect-error because precise reason
let model: nsfwjs.NSFWJS;
console.log("loading model...");
  // @ts-expect-error because precise reason
nsfwjs.load().then((loaded) => {
  model = loaded
  console.log("Loaded nsfwjs model");
  console.log("Getting predictions and score...");
  checkBlacklisted();
})



function checkBlacklisted() {
  chrome.storage.local.get(["bannedURLs", "ai"], function (result) {
    const bannedURLs: string[] = result.bannedURLs ?? [];
    const ai: number = result.ai ?? 1
    if (bannedURLs.some((e) => tabUrl.includes(e))) {
      //block();
    } else if (ai === 1) {
      
      analysePage();
    } else {
      console.log("page not analysed because ai = 0");
    }
  });
}

interface ImagePixel {
    element: HTMLImageElement
    pixels: number
}

const analysePage = async () => {
  const imagePixelArray: ImagePixel[] = []
  const imgs = [...document.getElementsByTagName("img")];
  console.log(`Found ${imgs.length} images on page`);

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;

    if (imgWidth === 0 || imgHeight === 0) {
      imgs.splice(i, 1);
      i--;
    }
    const pixels = imgWidth * imgHeight
    imagePixelArray.push({element: img, pixels})
    // set img src as base64
    //imgs[i].src = getBase64Image(img);
  }

  imagePixelArray.sort((a, b) => {
      if (a.pixels === b.pixels) return 0
      return a.pixels > b.pixels ? -1 : 1
  })
  const biggestImages = imagePixelArray.slice(0, 3).map(imagePixel => imagePixel.element)
  console.log(biggestImages)
    const promiseArray = biggestImages.map((img) => {
    return new Promise((resolve, reject) => {
      resolve(model.classify(img));
    });
  });
  Promise.allSettled(promiseArray).then((predictions) => {
    for (let i = 0; i < predictions.length; i++) {
      console.log(predictions[i], biggestImages[i]);
    }
    // @ts-expect-error promise I will learn ts
    let score = getScore(predictions as PromiseSettledResult<nsfwjs.predictionType>[]);
    console.log(`score : ${score}`);
    if (score > treeshold) {
      console.log("Seems like porn !");
      PUNISH();
    } else {
      console.log("All seems fine.");
    }
  })
}

interface values {
  status: string
  value: {
    className: string
    probability: number
  }[]
}
function getScore(values: values[]) {
  let pScore = 0;
  function incrementPScore(value: values) {
    if (value.status == "fulfilled") {
      for (let i = 0; i < 5; i++) {
        if (value.value[i].className == "Porn") {
          pScore += value.value[i].probability;
        }
      }
    }
  }
  values.forEach((e) => incrementPScore(e));
  pScore = pScore / values.length;
  return pScore;
}


//MODULE WEBHOOK :

function PUNISH() {
  const url = tabUrl.replace("https://", "");
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

function postToWebhookThenBlock(content: string) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", webHookUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  const data = {
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