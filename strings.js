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
  
    // Add the "string-row" class to the string element
    stringElement.classList.add("string-row");
  
    // Create a new element for the trashcan icon
    var iconElement = document.createElement('img');
  
    // Set the src of the icon element to the trashcan.png file
    iconElement.src = 'img/trashcan.png';
  
    // Add the "trashcan-icon" class to the icon element
    iconElement.classList.add("trashcan-icon");
  
    // Add the icon element to the string element
    stringElement.appendChild(iconElement);
  
    // Add an event listener for the click event on the string element
    stringElement.addEventListener('click', function() {
      // Get the ID of the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTabId = tabs[0].id;
  
        // Try to send a message to the content script of the current tab
        var messageSent = chrome.tabs.sendMessage(currentTabId, { action: 'insertString', string: string });
  
        // Close the popup after the message is sent
        messageSent.then(function() {
          window.close();
        });
      });
    });
  
    return stringElement;
  }

