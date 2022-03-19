console.log("content script running");

const tabUrl = location.href;
const treeshold = 0.5;
const webHookUrl = 'http://localhost:5000/'
const webHookUrl2 =
  "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";
// @ts-expect-error because precise reason
let model: nsfwjs.NSFWJS;

chrome.storage.local.get(["defaultBlocklist"], function (result) {
  const defaultBlocklist: string[] = result.defaultBlocklist ?? [];
  console.log("defaultBlocklist", defaultBlocklist);
  if (defaultBlocklist.some((e) => tabUrl.includes(e))) console.log('lol')
});

chrome.storage.sync.get(["userBlocklist", "aiFiltering"], function (result) {
  const aiFiltering: boolean = result.aiFiltering ?? false;
  if (aiFiltering === true) {
    console.log("loading model...");
    // @ts-expect-error because precise reason
    nsfwjs.load().then((loaded) => {
      model = loaded;
      console.log("Loaded nsfwjs model");
      console.log("Getting predictions and score...");
      analysePage();
    });
  } else {
    console.log("Page not analysed because aiFiltering = false");
  }
  const userBlocklist: string[] = result.userBlocklist ?? [];
  console.log("userBlocklist", userBlocklist);
  for (const key in result.userBlocklist) {
    if (tabUrl.includes(result.userBlocklist[key])) PUNISH();
  }
});

interface ImagePixel {
  element: HTMLImageElement;
  pixels: number;
}

const analysePage = async () => {
  console.log(`Starting to analyse page...`);
  const imagePixelArray: ImagePixel[] = [];
  let imgs = document.getElementsByTagName("img");
  //@ts-expect-error I promise I will learn ts later
  imgs = [...imgs];
  console.log(`Found ${imgs.length} images on page`);
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    img.width = img.clientWidth;
    img.height = img.clientHeight;
    if (img.src && img.width > 41 && img.height > 41 && img.naturalHeight > 10) {
      //console.log('i', i, 'width', imgs[i].width, 'clientWidth', img.width)
      const pixels = img.width * img.height;
      imagePixelArray.push({ element: img, pixels });
    }
  }
  imagePixelArray.sort((a, b) => {
    if (a.pixels === b.pixels) return 0;
    return a.pixels > b.pixels ? -1 : 1;
  });
  //imagePixelArray.forEach(e => console.log(e))
  let imageArray = imagePixelArray.map((e) => e.element);

  let fetchableImages: HTMLImageElement[] = [];

  for (let i = 0; i < imageArray.length; i++) {
    const img = imageArray[i];
    try {
      await fetch(img.src);
      fetchableImages.push(img);
      console.log("image poussée");
      if (fetchableImages.length === 3) break;
    } catch (e: any) {
      console.log("erreur");
      continue;
    }
  }

  console.log("3 biggest fetchables images:", fetchableImages);
  const promiseArray = fetchableImages.map((img) => {
    return new Promise((resolve, reject) => {
      //console.log('Etape 1 : conversion en New Image()')
      const image: HTMLImageElement = new Image(img.width, img.height)
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(model.classify(image));
      image.src = img.src
    });
  });

  interface prediction {
    status: string;
    value: {
      className: string;
      probability: number;
    }[];
  }

  Promise.allSettled(promiseArray).then((predictions: PromiseSettledResult<unknown>[]) => {
    for (let i = 0; i < predictions.length; i++) {
      // @ts-expect-error promise I will learn ts
      const prediction: prediction = predictions[i]
      console.log('Image ' + i + ' ' + prediction.status);
      if (prediction.status === 'fulfilled') {
        for (const key in prediction.value) {
          console.log(prediction.value[key]);
        }
      }
      console.log('pScore : ' + getPScore(prediction))
      console.log('hScore : ' + getHScore(prediction))
      console.log(fetchableImages[i]);
    }
    // @ts-expect-error promise I will learn ts
    let pScores = predictions.map(e => getPScore(e)) // pScores = [0.675, 0.236, 0.456]
    let averageWHbyTwo = 0
    for (let i = 0; i < fetchableImages.length; i++) {
      averageWHbyTwo += (fetchableImages[i].width+fetchableImages[i].height)/2
    }
    averageWHbyTwo /= fetchableImages.length
    console.log('averageWHbyTwo : ', averageWHbyTwo)
    for (let i = 0; i < pScores.length; i++) {
      pScores[i] = pScores[i]*(fetchableImages[i].width + fetchableImages[i].height)/(2*averageWHbyTwo)
    }
    // @ts-expect-error promise I will learn ts
    let hScores = predictions.map(e => getHScore(e))
    let pScore = pScores.reduce((a, b) => a + b, 0)/pScores.length
    let hScore = hScores.reduce((a, b) => a + b, 0)/hScores.length
    console.log(`pScore Total : ${pScore}`);
    console.log(`hScore Total : ${hScore}`);
    if (pScore > treeshold) {
      console.log("Seems like porn !");
      //PUNISH();
    } else if (hScore > treeshold){
      console.log("Seems like Hentai !");
      //PUNISH();
    } else {
      console.log("All seems fine.");
    }
  })
};

interface values {
  status: string;
  value: {
    className: string;
    probability: number;
  }[];
}

function getPScore(value: values) {
  let pScore = 0;
  if (value.status == "fulfilled") {
    for (let i = 0; i < 5; i++) {
      if (value.value[i].className == "Porn") pScore += value.value[i].probability
      if (value.value[i].className == "Sexy") pScore += value.value[i].probability*0.3
    }
  }  
  return pScore
}

function getHScore(value: values) {
  let hScore = 0;
  if (value.status == "fulfilled") {
    for (let i = 0; i < 5; i++) {
      if (value.value[i].className == "Hentai") hScore += value.value[i].probability
    }
  }  
  return hScore
}

chrome.storage.sync.get(["dayCounter"], (result: any) => {
  if (result.dayCounter) {
    chrome.runtime.sendMessage({ greeting: "refreshDayCounter" });
  }
});

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
  chrome.storage.sync.get(["blockingType"], function (result) {
    if (result.blockingType === 0 || result.blockingType === 1) {
      location.replace(
        "chrome-extension://" +
          chrome.runtime.id +
          "/blockpages/blockpageChad.html"
      );
    } else if (result.blockingType === 2) {
      location.replace(
        "chrome-extension://" +
          chrome.runtime.id +
          "/blockpages/blockpageVideo.html"
      );
    } else if (result.blockingType === 3) {
      chrome.runtime.sendMessage({ message: "closeIt" });
    } else {
      console.log("This blocking type does not exist");
    }
  });
}