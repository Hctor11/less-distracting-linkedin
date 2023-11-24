chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const extension = "https://www.linkedin.com/feed/";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url === extension) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["ld-linkedin.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["ld-linkedin.css"],
        target: { tabId: tab.id },
      });
    }

  }else if (tab.url === 'https://www.linkedin.com/jobs/') {
    await chrome.scripting.removeCSS({
      files: ["ld-linkedin.css"],
      target: { tabId: tab.id },
    });
  }
});
