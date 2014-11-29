function clickHandler(e) {
  setTimeout(alert, 1000);
  setTimeout(addSomething, 1000);
}

function addSomething() {
    console.log("ay");
    document.getElementById('demo').innerHTML = "helloWorld!"
}

function alert() {
    alert('hay!')
}

function main() {
  // Initialization work goes here.
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', addSomething);
  main();
});