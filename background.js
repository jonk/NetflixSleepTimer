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

var keep_time = true;

var timer;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  clearTimeout(timer);
  var remainingSecs = request.timeLeft;
  keep_time = (remainingSecs != -1);
  console.log(keep_time);
  (function() {
    if (keep_time) {
    remainingSecs = remainingSecs - 1;
    chrome.extension.sendRequest({remainingSecs:remainingSecs});
      if (remainingSecs > 0) {
          timer = setTimeout(arguments.callee, 1000);
      } else {
        doInCurrentTab( function(tab) { 
            chrome.tabs.update(tab.id, { url: "sleepytimes.html", active: true } );
        });
      }
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


