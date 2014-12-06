var timeLeft = 0;

function updateTimer(time) {
    timeLeft = time * 60;
}

function handleTimer() {
    if (timeLeft > 0) {
        chrome.extension.sendRequest({timeLeft:timeLeft});
    }

}

// function startTiming() {
//     timeLeft = timeLeft - 1;
//     document.getElementById('timer').innerHTML = Math.floor(timeLeft / 60) + ":" + timeLeft % 60
// }

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log("laucher received", request.remainingSecs);
    }
);

function main() {

    document.getElementById('15_min').addEventListener('click', function() { updateTimer(15) });
    document.getElementById('30_min').addEventListener('click', function() { updateTimer(30) });
    document.getElementById('60_min').addEventListener('click', function() { updateTimer(60) });
    document.getElementById('start_button').addEventListener('click', handleTimer);

}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
    main();
});