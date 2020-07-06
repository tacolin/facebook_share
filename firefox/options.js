function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    width: document.querySelector("#width").value,
    height: document.querySelector("#height").value,
  });
}

function restoreOptions() {

  function setCurrentSize(result) {
    document.querySelector("#width").value = result.width || 600;
    document.querySelector("#height").value = result.height || 400;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get(["width", "height"]);
  getting.then(setCurrentSize, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
