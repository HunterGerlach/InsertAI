// Get the container element for the saved strings
var container = document.getElementById('saved-strings-container');

// Get the list of saved strings from storage
chrome.storage.sync.get(['savedStrings'], function(result) {
  // Check if the list of saved strings exists
  if (result.savedStrings) {
    // Loop through the list of saved strings
    for (var i = 0; i < result.savedStrings.length; i++) {
      // Create a new element for the saved string
      var stringElement = document.createElement('div');

      // Set the text of the element to the saved string
      stringElement.textContent = result.savedStrings[i];

      // Add an event listener for the click event on the string element
      stringElement.addEventListener('click', function() {
        // Get the selected string from the text of the element
        var selectedString = this.textContent;

        // Check if the chrome and chrome.tabs objects are defined
        if (typeof chrome !== 'undefined' && typeof chrome.tabs !== 'undefined') {
          // Use the chrome.tabs.query function to find the active tab
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // Send a message to the content script of the active tab with the selected string
            chrome.tabs.sendMessage(tabs[0].id, {selectedString: selectedString});
          });
        }
      });

      // Add the element to the container
      container.appendChild(stringElement);
    }
  }
});

// Get the input element for the string
var input = document.getElementById('string-input');

// Get the save button
var saveButton = document.getElementById('save-button');

// Define a function to save a string to storage
function saveString() {
  // Get the list of saved strings from storage
  chrome.storage.sync.get(['savedStrings'], function(result) {
    // Check if the list of saved strings exists
    if (result.savedStrings) {
      // Add the new string to the list of saved strings
      result.savedStrings.push(input.value);

      // Save the updated list of saved strings to storage
      chrome.storage.sync.set({savedStrings: result.savedStrings});
    } else {
      // Create a new list of saved strings with the new string
      var savedStrings = [input.value];

      // Save the new list of saved strings to storage
      chrome.storage.sync.set({savedStrings: savedStrings});
    }
  });
}

// Add an event listener for the click event on the save button
saveButton.addEventListener('click', saveString);

// Define a function to handle the keydown event on the input element
function handleKeydown(event) {
    // Check if the "Enter" key was pressed
    if (event.keyCode === 13) {
      // Call the saveString() function
      saveString();
    }
  }
  
  // Add an event listener for the keydown event on the input element
  input.addEventListener('keydown', handleKeydown);
  
  // Define a function to handle the message event
function handleMessage(message) {
    // Check if the message contains a selected string
    if (message.selectedString) {
      // Get the active text input element
      var activeElement = document.activeElement;
  
      // Check if the active element is a text input or textarea
      if (activeElement.tagName === 'INPUT' && activeElement.type === 'text' || activeElement.tagName === 'TEXTAREA') {
        // Insert the selected string at the cursor position
        activeElement.value = activeElement.value.substring(0, activeElement.selectionStart) + message.selectedString + activeElement.value.substring(activeElement.selectionEnd);
      }
    }
  }
  
  // Check if the chrome and chrome.runtime objects are defined
  if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined') {
    // Add a message listener that listens for messages from the content script and calls the handleMessage() function
    chrome.runtime.onMessage.addListener(handleMessage);
  }
  