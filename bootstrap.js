
chrome.tabs.executeScript(null, { code: "document.body.style.background='red !important'" });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, { file: "ptcx.js" });
});


