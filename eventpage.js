chrome.browserAction.onClicked.addListener(function() {
    var iframe = document.getElementById('theFrame');
    var message = {
        command: 'render',
        context: {thing: 'world'}
    };
    iframe.contentWindow.postMessage(message, '*');
});