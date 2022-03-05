var iframe = document.getElementById('iFrame');
var message = {
    command: 'render',
    context: {thing: 'world'}
};
iframe.contentWindow.postMessage(message, '*');
console.log('appelé a chaque reload')