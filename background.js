async function getResponse(messages, apiKey) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "messages": messages,
                "model": "gpt-3.5-turbo",
                "temperature": 0
            })
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function generateScript(prompt) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['apiKey'], function(result) {
            if (!('apiKey' in result)) {
                reject("Error: No API key found");
                return;
            }
            apiKey = result.apiKey;
            systemPrompt = `
            You are an implementation of OpenAI GPT that gives Javascript responses to modify a webpage.
            You are a chrome extension, generate a script to be injected in the webpage based on the user input.
            You will be given input like this:
            {
                "user_input": "Make the background blue"
            }
            Give your output as json like this:
            {
                "javascript": "document.body.style.backgroundColor = 'blue';"
            }
            Don't use a code block for the json.
            Always respond in valid javascript that can be injected into a webpage, in the json format.
            If the input is javascript code, just return the input.
            `;
            formattedPrompt = JSON.stringify({
                "user_input": prompt
            });
            messages = [{"role": "system", "content": systemPrompt}, {"role": "user", "content": prompt}];
            getResponse(messages, apiKey)
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}   

chrome.runtime.onMessage.addListener(function(request) {
    if (request.inputData) {
        console.log(request.inputData);
        chrome.storage.local.get(['tabId'], function(result) {
            // file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
            generateScript(request.inputData).then((response) => {
                message = response["choices"][0]["message"]["content"];
                console.log(message);
                javascript = JSON.parse(message)["javascript"];
                console.log(javascript);
                chrome.tabs.executeScript(
                    result.tabId,
                    {code: javascript}
                );
            });
        });
    }

    if (request.key) {
        chrome.storage.local.set({apiKey: request.key});
    }
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === "open-popup") {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
            chrome.storage.local.set({tabId: tabs[0].id}, function() {
                chrome.windows.create({
                    url: "popup/popup.html",
                    type: "popup",
                    width: 400,
                    height: 100
                  });
            });
        });
    }
  });