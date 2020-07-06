function saveOptions(e) {
  e.preventDefault();

  chrome.storage.sync.set({width: document.querySelector("#width").value});

  chrome.storage.sync.set({height: document.querySelector("#height").value});
}

function restoreOptions() {

  function setCurrentSize(result) {
    document.querySelector("#width").value = result.width || 600;
    document.querySelector("#height").value = result.height || 400;
  }

  chrome.storage.sync.get(["width", "height"], function(result) {
    setCurrentSize(result);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
