var MATCH_REGEXES = [
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/.*$/,
    /^https?:\/\/www\.googleapis\.com\/youtube\/.*$/,
    ///^https?:\/\/youtube\.clients6\.google\.com\/.*$/,
    /^https?:\/\/(?:content-youtube|storage)\.googleapis\.com\/.*$/,
    /^https?:\/\/(?:myactivity|youtube\.clients6)\.google\.com\/.*$/,
    ///^https?:\/\/storage\.googleapis\.com\/.*$/
];

var EXCLUDE_REGEXES = [
    ///^https?:\/\/.*\.youtube\.com\/tv\#.*$/,
    ///^https?:\/\/.*\.youtube\.com\/tv\?.*$/,
    ///^https?:\/\/(?:[\w-]+\.)?youtube\.com\/tv$/,
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/tv(?:$|[\/#?].*$)/,
    /^https?:\/\/(?:studio|consent|img)\.youtube\.com\/.*$/,
    ///^https?:\/\/consent\.youtube\.com\/.*$/,
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/(?:oembed|api\/|subscribe_embed|s\/|img\/).*$/,
    /*/^https?:\/\/(?:[\w-]+\.)?youtube\.com\/api\/.*$/,
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/subscribe_embed.*$/,
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/s\/.*$/,
    /^https?:\/\/(?:[\w-]+\.)?youtube\.com\/img\/.*$/,
    /^https?:\/\/img\.youtube\.com\/.*$/*/
];

chrome.webNavigation.onCommitted.addListener(function (info) {
    var url = info.url;
    var shouldInject = false;
    for (var i = 0, j = MATCH_REGEXES.length; i < j; i++) {
        if (MATCH_REGEXES[i].test(url)) {
            shouldInject = true;
            break;
        }
    }
    if (!shouldInject) {
        return;
    }
    for (i = 0, j = EXCLUDE_REGEXES.length; i < j; i++) {
        if (EXCLUDE_REGEXES[i].test(url)) {
            return;
        }
    }
    
    chrome.scripting.executeScript({
        target: { tabId: info.tabId, frameIds: [info.frameId] },
        files: ['PatcherJSC_TURBO.user.js'],
        world: 'MAIN',
        injectImmediately: true
    });
});