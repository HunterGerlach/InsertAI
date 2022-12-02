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

      // Add the element to the container
      container.appendChild(stringElement);
    }
  }
});

// Get the input element for the string
var input = document.getElementById('string-input');

// Get the save button
var saveButton = document.getElementById('save-button');

// Add an event listener for the save button
saveButton.addEventListener('click', function() {

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
});

// Define a function to handle the keydown event on the input element
function handleKeydown(event) {
    // Check if the "Enter" key was pressed
    if (event.keyCode === 13) {
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
  }
  
  // Add an event listener for the keydown event on the input element
  input.addEventListener('keydown', handleKeydown);

// Add an event listener for the storage update event
chrome.storage.onChanged.addListener(function(changes, namespace) {
  // Check if the saved strings were updated
  if (changes.savedStrings) {
    // Clear the container
    container.innerHTML = '';

    // Loop through the updated list of saved strings
    for (var i = 0; i < changes.savedStrings.newValue.length; i++) {
      // Create a new element for the saved string
      var stringElement = document.createElement('div');

      // Set the text of the element to the saved string
      stringElement.textContent = changes.savedStrings.newValue[i];

      // Add the element to the container
      container.appendChild(stringElement);
    }
  }
});
