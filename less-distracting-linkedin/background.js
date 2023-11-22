
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
      });
})

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async tab => {

    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        chrome.tabs.create({ url: webstore })
    } else {
        chrome.tabs.create({ url: extensions })
    }

})