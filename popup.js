const languageSearchInput = document.getElementById('languageSearch');
const languageSelect = document.getElementById('languageSelect');
let allLanguages = [];

chrome.runtime.sendMessage({ action: "getLanguages" }, response => {
  allLanguages = response.languages;
  populateLanguageDropdown(allLanguages);
  const currentLanguageCode = response.currentLanguageCode;

  if (currentLanguageCode) {
    languageSelect.value = currentLanguageCode;
  }
});

function populateLanguageDropdown(languagesToDisplay) {
  languageSelect.innerHTML = '<option value="">Browser Default</option>';
  languagesToDisplay.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelect.appendChild(option);
  });
}

languageSearchInput.addEventListener('input', () => {
  const searchTerm = languageSearchInput.value.toLowerCase();
  const filteredLanguages = allLanguages.filter(lang => {
    return lang.name.toLowerCase().includes(searchTerm) || lang.code.toLowerCase().includes(searchTerm);
  });
  populateLanguageDropdown(filteredLanguages);
});


languageSelect.addEventListener('change', () => {
  const selectedLanguageCode = languageSelect.value;

  if (selectedLanguageCode) {
    chrome.runtime.sendMessage({ action: "setLanguage", languageCode: selectedLanguageCode }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  } else {
    chrome.runtime.sendMessage({ action: "removeLanguage" }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  }
});