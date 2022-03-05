console.log("sandbox")
window.addEventListener('message', function(event) {
    var command = event.data.command;
    var name = event.data.name || 'hello';
    console.log("MESSAGE RECEIVED")
    switch(command) {
        case 'render':
            event.source.postMessage({
                name: name,
                html: templates[name](event.data.context)
            }, event.origin);
            break;

        // case 'somethingElse':
        //   ...
    }
});