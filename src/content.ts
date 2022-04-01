const tabUrl = location.href;
// @ts-expect-error because precise reason
let model: nsfwjs.NSFWJS;

chrome.storage.local.get(["defaultBlocklist"], function (result) {
  const defaultBlocklist: string[] = result.defaultBlocklist ?? [];
  if (defaultBlocklist.some((e) => tabUrl.includes(e))) {
    PUNISH();
  }
})

chrome.storage.sync.get(["userBlocklist", "aiFiltering", "dayCounter"], function (result) {
  if (result.aiFiltering == 'true') {
    chrome.storage.local.get(["updatedConstants"], function (result) {
      const PORN_THRESHOLD = result.updatedConstants?.pornthreshold ?? 0.6
      const SEXY_WEIGHT = result.updatedConstants?.sexyweigth ?? 0.2
      const HENTAI_THRESHOLD = result.updatedConstants?.hentaithreshold ?? 0.5;
      const WEIGHT_OF_PSCORE_IN_HSCORE = result.updatedConstants?.pscoreweightinhscore ?? 0.5
      const NUMBER_OF_IMAGES_TO_ANALYZE = result.updatedConstants?.imagestoanalyse ?? 10;

      const modelUrl = chrome.runtime.getURL('./nsfw-filter-models/');

      //@ts-expect-error because precise reason
      nsfwjs.load(modelUrl, { type: 'graph' }).then((loaded) => {
        model = loaded;
        analysePage(PORN_THRESHOLD, SEXY_WEIGHT, HENTAI_THRESHOLD, WEIGHT_OF_PSCORE_IN_HSCORE, NUMBER_OF_IMAGES_TO_ANALYZE);
      });
    });
  } else {
    //Page not analysed because aiFiltering = false
  }

  const userBlocklist: string[] = result.userBlocklist ?? [];
  for (const key in result.userBlocklist) {
    if (tabUrl.includes(result.userBlocklist[key])) PUNISH();
  }

  if (result.dayCounter) {
    chrome.runtime.sendMessage({ greeting: "refreshDayCounter" });
  }
});

interface ImagePixel {
  element: HTMLImageElement;
  pixels: number;
}

const analysePage = async (PORN_THRESHOLD: number, SEXY_WEIGHT: number, HENTAI_THRESHOLD: number, WEIGHT_OF_PSCORE_IN_HSCORE: number, NUMBER_OF_IMAGES_TO_ANALYZE: number) => {
  const imagePixelArray: ImagePixel[] = [];
  var imgs = document.getElementsByTagName("img");
  //@ts-expect-error I promise I will learn ts later
  imgs = [...imgs];

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    img.width = img.clientWidth;
    img.height = img.clientHeight;

    //----------------------------------THE GREAT FILTERS--------------------------------------//

    if (img.src
      && img.width > 41
      && img.height > 41
      && img.naturalHeight > 10
      && img.naturalWidth > 10
      && img.src.slice(-3) !== "svg"
      && img.src.slice(-3) !== "png"
      && img.src.slice(11, 14) !== "svg"
      ) {
      const pixels = img.width * img.height;
      imagePixelArray.push({ element: img, pixels });
    }
  }
  imagePixelArray.sort((a, b) => {
    if (a.pixels === b.pixels) return 0;
    return a.pixels > b.pixels ? -1 : 1;
  });

  let imageArray = imagePixelArray.map((e) => e.element);
  let fetchableImages: HTMLImageElement[] = [];

  for (let i = 0; i < imageArray.length; i++) {
    const img = imageArray[i];
    try {
      await fetch(img.src);
      fetchableImages.push(img);
      if (fetchableImages.length === NUMBER_OF_IMAGES_TO_ANALYZE) break;
    } catch (e: any) {
      continue;
    }
  }
  if (fetchableImages.length === 0) {
    //No image worth analysing.
    return
  }
  
  const averageWH = (fetchableImages.map(e => e.width).reduce((a, b) => a + b, 0) + fetchableImages.map(e => e.height).reduce((a, b) => a + b, 0))/(2*fetchableImages.length)
  const promiseArray = fetchableImages.map((img) => {
    return new Promise((resolve, reject) => {
      const image: HTMLImageElement = new Image(img.width, img.height)
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(model.classify(image));
      image.src = img.src
    });
  });

  // @ts-expect-error --- I promise I will learn more ts later
  Promise.allSettled(promiseArray).then((predictions: values[]) => {
    let pScores = predictions.map(e => getPScore(e, SEXY_WEIGHT))
    let hScores = predictions.map(e => getHScore(e))

    //Weight by image size :
    for (let i = 0; i < pScores.length; i++) {
      pScores[i] = pScores[i]*(fetchableImages[i].width + fetchableImages[i].height)/(2*averageWH)
    }
    for (let i = 0; i < hScores.length; i++) {
      hScores[i] = hScores[i]*(fetchableImages[i].width + fetchableImages[i].height)/(2*averageWH)
    }
    
    let pScore = pScores.reduce((a, b) => a + b, 0)/pScores.length
    let hScore = hScores.reduce((a, b) => a + b, 0)/hScores.length
    hScore += pScore*WEIGHT_OF_PSCORE_IN_HSCORE
    if (pScore > PORN_THRESHOLD) {
      PUNISH();
    } else if (hScore > HENTAI_THRESHOLD){
      PUNISH();
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

function getPScore(value: values, SEXY_WEIGHT: number) {
  let pScore = 0;
  if (value.status == "fulfilled") {
    for (let i = 0; i < 5; i++) {
      if (value.value[i].className == "Porn") pScore += value.value[i].probability
      if (value.value[i].className == "Sexy") pScore += value.value[i].probability*SEXY_WEIGHT
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

//MODULE WEBHOOK :
function PUNISH() {
  const url = tabUrl.replace("https://", "");
  chrome.storage.sync.get(["username"], function (data) {
    if (data.username) {
      chrome.runtime.sendMessage({ message: "SendItToDiscord!", username: data.username, url: url});
      block();
    } else {
      //Triché mais pas connecté !
      block();
    }
  });
}

function block() {
  chrome.storage.sync.get(["blockingType"], function (result) {
    if (result.blockingType === 0 || result.blockingType === 1) {
      location.replace(
        "chrome-extension://" +
          chrome.runtime.id +
          "/blockpages/Stop_And_Reflect.html"
      );
    } else if (result.blockingType === 2) {
      location.replace(
        "chrome-extension://" +
          chrome.runtime.id +
          "/blockpages/Stop_And_Refocus.html"
      );
    } else if (result.blockingType === 3) {
      chrome.runtime.sendMessage({ message: "closeIt" });
    } else {
      //This blocking type does not exist
    }
  });
}