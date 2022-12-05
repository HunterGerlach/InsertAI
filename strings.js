// Get the container element for the saved strings
var container = document.getElementById('saved-strings-container');

// Define a function to update the list of saved strings
function updateSavedStrings() {
    // Get the container element
    var container = document.getElementById('saved-strings-container');
  
    // Check that the element exists
    if (container) {
      // Set the innerHTML property of the element
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
  }
  
  
// Define a function to create a new element for a saved string
function createStringElement(string) {
    // Create a new element for the saved string
var stringElement = document.createElement('div');

// Add the "string-row" class to the string element
stringElement.classList.add("string-row");

// Create a new element for the saved string text
var stringTextElement = document.createElement('span');

// Set the text of the element to the saved string
stringTextElement.textContent = string;

// Append the span element to the parent div
stringElement.appendChild(stringTextElement);

// Create a new element for the magic icon
var magicIconElement = document.createElement('img');

// Set the src of the icon element to the magic.png file
magicIconElement.src = 'img/magic.png';

// Add the "magic-icon" class to the icon element
magicIconElement.classList.add("magic-icon");

// Append the magic icon element to the parent div
stringElement.appendChild(magicIconElement);

// Create a new element for the trashcan icon
var trashcanIconElement = document.createElement('img');

// Set the src of the icon element to the trashcan.png file
trashcanIconElement.src = 'img/trashcan.png';

// Add the "trashcan-icon" class to the icon element
trashcanIconElement.classList.add("trashcan-icon");

// Append the trashcan icon element to the parent div
stringElement.appendChild(trashcanIconElement);


    // Add a click event listener to the trashcan icon
    trashcanIconElement.addEventListener('click', function() {
        // Remove the corresponding item from the list of saved strings
        removeString(string);
    });
  
    // Add the trashcan icon element to the string element
    stringElement.appendChild(trashcanIconElement);
  
    // Add an event listener for the click event on the string element
    stringElement.addEventListener('click', function() {

    // Get the ID of the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTabId = tabs[0].id;
  
      // Try to send a message to the content script of the current tab
      var messageSent = chrome.tabs.sendMessage(currentTabId, { action: 'insertString', string: string });
  
      // Do not close the popup after the message is sent
      messageSent.then(function() {
        // Do not close the popup
      });
    });
  });
  
  
    return stringElement;
  }

// Define a function to remove a string from the list of saved strings
function removeString(string) {
    // Get the list of saved strings from storage
    chrome.storage.sync.get(['savedStrings'], function(result) {
      // Check if the list of saved strings exists
      if (result.savedStrings) {
        // Loop through the list of saved strings
        for (var i = 0; i < result.savedStrings.length; i++) {
          // Check if the current string matches the string to remove
          if (result.savedStrings[i] === string) {
            // Remove the string from the list
            result.savedStrings.splice(i, 1);
  
            // Save the updated list of saved strings to storage
            chrome.storage.sync.set({ savedStrings: result.savedStrings });
  
            // Update the list of saved strings in the popup
            updateSavedStrings();
  
            // Break out of the loop
            break;
          }
        }
      }
    });
  }
