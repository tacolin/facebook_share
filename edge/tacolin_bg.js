function handleResponse(message) {

    function openWindowNew(result) {
        const width = result.width || "600";
        const height = result.height || "400";

        var spec = 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, ';
        spec = spec.concat('width=', width, ', ');
        spec = spec.concat('height=', height);
        window.open(message.full_url, 'fbShareWindow', spec);
    }

    // function openWindow(result) {
    //     const width = result.width || "600";
    //     const height = result.height || "400";
    //     const win_width = parseInt(width, 10);
    //     const win_height = parseInt(height, 10);

    //     chrome.windows.create({
    //         "url": message.full_url,
    //         "type": "panel",
    //         "width": win_width,
    //         "height": win_height
    //     })
    // }

    chrome.storage.sync.get(["width", "height"], openWindowNew);
    // chrome.storage.sync.get(["width", "height"], openWindow);
}

function clicked(tab) {
    const info = {
        message: "tacolin.fb.share.click",
        current_url: tab.url
    };

    chrome.tabs.sendMessage(tab.id, info, handleResponse);
}

chrome.browserAction.onClicked.addListener(clicked);

function menu_clicked(info, tab) {
    clicked(tab);
}

chrome.contextMenus.create({
  id: "tacolin.fb.share.menu",
  title: "分享到臉書 (&X)",
  onclick: menu_clicked,
  contexts: ["all"]
});

chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        clicked(tabs[0]);
    });
});
