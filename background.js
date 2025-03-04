const ruleId = 1;
let allLanguages = [];

async function fetchLanguages() {
  const response = await fetch('languages.json');
  const data = await response.json();
  return data;
}

async function initializeLanguages() {
  allLanguages = await fetchLanguages();
}

initializeLanguages();

let currentLanguageCode = null;

function updateAcceptLanguageHeader(languageCode) {
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [ruleId],
    addRules: [{
      "id": ruleId,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [
          { "header": "Accept-Language", "operation": "set", "value": languageCode }
        ]
      },
      "condition": {
        "urlFilter": "*",
        "resourceTypes": ["main_frame", "sub_frame", "xmlhttprequest", "script", "image", "stylesheet", "font", "other"]
      }
    }]
  });
  currentLanguageCode = languageCode;
  chrome.storage.local.set({ currentLanguageCode: languageCode });
}

function removeAcceptLanguageHeaderRule() {
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [ruleId]
  });
  currentLanguageCode = null;
  chrome.storage.local.remove('currentLanguageCode');
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "setLanguage") {
      updateAcceptLanguageHeader(request.languageCode);
    } else if (request.action === "removeLanguage") {
      removeAcceptLanguageHeaderRule();
    } else if (request.action === "getLanguages") {
      sendResponse({ languages: allLanguages, currentLanguageCode: currentLanguageCode });
    }
  }
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['currentLanguageCode'], (result) => {
    const storedLanguageCode = result.currentLanguageCode;
    if (storedLanguageCode) {
      updateAcceptLanguageHeader(storedLanguageCode);
    }
  });
  initializeLanguages();
});