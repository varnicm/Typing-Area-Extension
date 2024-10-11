document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activateButton').addEventListener('click', () => {
      // Get the active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0].id;
  
        // Inject content.js into the active tab
        chrome.scripting.executeScript({
          target: {tabId: activeTab},
          files: ['content.js']
        });
      });
    });
  });
  