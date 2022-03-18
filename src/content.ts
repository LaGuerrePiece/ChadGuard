console.log("content script running");

const tabUrl = location.href;
const treeshold = 0.5;
const webHookUrl =
  "https://discord.com/api/webhooks/945642399584120842/hU9VSm0vuyMzF1CQ8cCqCmMbuDN6JHy39JVm9f5WNwG4mvCbfa0IIRkmTWq-ectXUKyG";
// @ts-expect-error because precise reason
let model: nsfwjs.NSFWJS;

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
  console.log("got it from syncstorage!", userBlocklist);
  if (userBlocklist.some((e) => tabUrl.includes(e))) PUNISH();
});

chrome.storage.local.get(["defaultBlocklist"], function (result) {
  const defaultBlocklist: string[] = result.defaultBlocklist ?? [];
  console.log("got it from localstorage!", defaultBlocklist);
  if (defaultBlocklist.some((e) => tabUrl.includes(e))) PUNISH();
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
    if (img.src && img.width > 41 && img.height > 41) {
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
};

interface values {
  status: string;
  value: {
    className: string;
    probability: number;
  }[];
}

chrome.storage.sync.get(["startDayCounter"], (result) => {
  let startDayCounter = result.startDayCounter;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMin = 1000 * 60;
  const dayElapsed = Math.round((Date.now() - startDayCounter) / oneMin);
  // console.log("startDayCounter", new Date(startDayCounter).toLocaleString());
  // console.log("COUNTER DAY DIFF", dayElapsed);
  chrome.storage.sync.set({ dayElapsed: dayElapsed });
  chrome.storage.sync.get(["dayCounter"], (result: any) => {
    // console.log("result.dayCounter", result.dayCounter);
    if (result.dayCounter) {
      chrome.runtime.sendMessage({ greeting: "hello" });
    }
  });
});

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
