//A importer :

//<script src="https://unpkg.com/@tensorflow/tfjs@2.6.0" type="text/javascript"></script>
//<script src="https://unpkg.com/nsfwjs@2.3.0" type="text/javascript"></script>

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: 'analyseImage',
        title: "Analyse this image !",
        contexts:["image"],
    });
});

chrome.contextMenus.onClicked.addListener(function(info) {
    window.alert(`jai cliqué! infos : ${info.srcUrl}`)


    const img = new Image();
    img.crossOrigin = "anonymous";
    //img.src = "https://i.imgur.com/HTC6pN8.jpeg";
    img.src = info.srcUrl;

    nsfwjs.load().then((model) => {
    model.classify(img).then((predictions) => {
        console.log("Predictions", predictions);
        window.alert("Predictions ", predictions)
    });
    })
});









// OTHER SOURCE :

// import * as nsfwjs from 'nsfwjs'

// const img = document.getElementById('img')

// // Load model from my S3.
// // See the section hosting the model files on your site.
// const model = await nsfwjs.load()

// // Classify the image
// const predictions = await model.classify(img)
// console.log('Predictions: ', predictions)