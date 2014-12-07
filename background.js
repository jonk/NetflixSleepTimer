chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains netflix' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'netflix' },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'sleepytimes'},
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

var timer;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  clearTimeout(timer);
  var remainingSecs = request.timeLeft;
  (function() {
    remainingSecs = remainingSecs - 1;
    chrome.extension.sendRequest({remainingSecs:remainingSecs});
    if (remainingSecs > 0) {
      timer = setTimeout(arguments.callee, 1000);
    } else {
      doInCurrentTab( function(tab) { 
          chrome.tabs.update(tab.id, { url: "sleepytimes.html", active: true } );
      });
    }
  })();
});

function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { 
            tabCallback(tabArray[0]); 
        }
    );
}


