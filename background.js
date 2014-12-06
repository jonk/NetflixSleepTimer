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
    }
  })();
});

// var timeLeft = 0;

// function updateTimer(time) {
//     timer = document.getElementById('timer');
//     timer.innerHTML = time + ":00";

//     timeLeft = time * 60;
// }

// function handleTimer() {
//     setInterval(function() {startTiming()}, 1000);

// }

// function startTiming() {
//     timeLeft = timeLeft - 1;
//     document.getElementById('timer').innerHTML = Math.floor(timeLeft / 60) + ":" + timeLeft % 60
// }
