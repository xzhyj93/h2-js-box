chrome.browserAction.onClicked.addListener(function() {
  chrome.windows.create({'url': 'popup.html', 'type': 'popup', width: 1000, height: 800});
});
