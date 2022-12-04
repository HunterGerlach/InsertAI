// Define a function to update the list of saved strings
function updateSavedStrings() {
    // Clear the container element
    container.innerHTML = '';
  
    // Get the list of saved strings from storage
    chrome.storage.sync.get(['savedStrings'], function(result) {
      // Check if the list of saved strings exists
      if (result.savedStrings) {
        // Loop through the list of saved strings
        for (var i = 0; i < result.savedStrings.length; i++) {
          // Create a new element for the saved string
          var stringElement = createStringElement(result.savedStrings[i]);
  
          // Add the element to the container
          container.appendChild(stringElement);
        }
      }
    });
  }
  
// Define a function to create a new element for a saved string
function createStringElement(string) {
    // Create a new element for the saved string
    var stringElement = document.createElement('div');
  
    // Set the text of the element to the saved string
    stringElement.textContent = string;
  
    // Add an event listener for the click event on the string element
    stringElement.addEventListener('click', function() {
      // Get the ID of the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTabId = tabs[0].id;
  
        // Try to send a message to the content script of the current tab
        chrome.tabs.sendMessage(currentTabId, { action: 'insertString', string: string }).then(function() {
          // If the message is received, close the popup
          window.close();
        }).catch(function(error) {
          // If the content script is not active, show an error message
          alert('Could not insert string. The content script is not active on this page.');
        });
      });
    });
  
    return stringElement;
  }
  
  
  // Define a function to send the selected string to the active tab
  function sendSelectedString(selectedString) {
    // Check if the chrome and chrome.tabs objects are defined
    if (typeof chrome !== 'undefined' && typeof chrome.tabs !== 'undefined') {
      // Use the chrome.tabs.query function to find the active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Send a message to the content script of the active tab with the selected string
        chrome.tabs.sendMessage(tabs[0].id, {selectedString: selectedString});
      });
    }
  }
