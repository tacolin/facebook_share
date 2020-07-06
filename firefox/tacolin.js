
function shareToFacebook(request, sender, sendResponse) {
    if (request.message == 'tacolin.fb.share.click') {

        var url = 'https://www.facebook.com/sharer/sharer.php?';
        url = url.concat('u=', encodeURIComponent(request.current_url));

        const quote = window.getSelection().toString().trim();
        if (quote) {
            let tmps = quote.split("\r\n");
            let str = ''
            for (let i=0; i<tmps.length; i++) {
                tmps[i] = tmps[i].trim();
                if (tmps[i].length == 0) {
                    continue;
                }
                str = str.concat(tmps[i] + "\r\n\r\n");
            }
            str = encodeURIComponent(str)
            url = url.concat('&quote=', str);
        }

        sendResponse({
            "full_url": url
        });
    }
}

browser.runtime.onMessage.addListener(shareToFacebook);
