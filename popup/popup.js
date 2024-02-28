document.getElementById('prompt_form').addEventListener('submit', function(e) {
    e.preventDefault();
    var inputData = document.getElementById('prompt').value;
    chrome.runtime.sendMessage({inputData: inputData});
    window.close();
});

document.getElementById('api_key_form').addEventListener('submit', function(e) {
    e.preventDefault();
    var key = document.getElementById('key').value;
    chrome.runtime.sendMessage({key: key});
    window.close();
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        window.close();
    }
});

chrome.storage.local.get(['apiKey'], function(result) {
    if ('apiKey' in result) {
        return;
    }

    document.getElementById('prompt_form').style.display = 'none';
    document.getElementById('api_key_form').style.display = 'block';
});