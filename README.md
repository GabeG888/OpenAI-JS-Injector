# OpenAI JS Injector
## Description
This is a chrome extension that modifies the contents of webpages by injecting Javascript with GPT-3.5.
## Installation
- Go to chrome://extensions
- Enable developer mode
- Click Load Unpacked and choose this folder
## How to Use
Click Ctrl+Q or the button in the extensions menu to open the interrface. You will be asked for your OpenAI API key the first time. You can get an OpenAI API key at https://platform.openai.com/api-keys. This extension costs about $0.01 per 50-100 requests. After entering your OpenAI API key, click Ctrl+Q again and enter what you want to happen.
## Example Prompts
- `light blue background`
- `alert(123)`
- `Replace 4 with 5`
- `Open 3 google search tabs`
- `Open 50 google search tabs`
- `Rotate 5 degrees`
- `Upside down`
- `Refresh`
- `Go back`
- `Click the first link`
- `Log the page HTML to the console`
## Warning
This extension runs code generated by a large language model in your browser with no safety measures. Use it carefully, as it could harm your device. This extension never reads the pages you view, but injected Javascript could.
