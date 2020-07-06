function handleResponse(message) {

    function openWindow(result) {
        const width = result.width || "600";
        const height = result.height || "400";
        const win_width = parseInt(width, 10);
        const win_height = parseInt(height, 10);
        browser.windows.create({
            "url": message.full_url,
            "type": "panel",
            "allowScriptsToClose": true,
            "width": win_width,
            "height": win_height
        })
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(["width", "height"]);
    getting.then(openWindow, onError);
}

function handleError(error) {
}

function clicked(tab) {
    const info = {
        message: "tacolin.fb.share.click",
        current_url: tab.url
    };

    let sending = browser.tabs.sendMessage(tab.id, info);
    sending.then(handleResponse, handleError);
}

browser.browserAction.onClicked.addListener(clicked);

browser.contextMenus.create({
  id: "tacolin.fb.share.menu",
  command: "_execute_browser_action",
  title: "分享到臉書 (&X)",
  contexts: ["all"]
});
