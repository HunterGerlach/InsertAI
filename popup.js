// Get the container element for the saved strings
var container = document.getElementById("saved-strings-container");

function saveString(string) {
  // Get the list of saved strings from storage
  chrome.storage.sync.get(["savedStrings"], function (result) {
    // Check if the list of saved strings exists
    if (result.savedStrings) {
      // Add the new string to the list of saved strings
      result.savedStrings.push(string);

      // Save the updated list of saved strings to storage
      chrome.storage.sync.set(
        { savedStrings: result.savedStrings },
        function () {
          // After saving the updated list, refresh the list of saved strings
          updateSavedStrings();
        }
      );
    } else {
      // Create a new list with the new string as the only item
      var newList = [string];

      // Save the new list of saved strings to storage
      chrome.storage.sync.set({ savedStrings: newList }, function () {
        // After saving the new list, refresh the list of saved strings
        updateSavedStrings();
      });
    }
    // Add the removeString() function here
    removeString();
  });
}

// Initialize the list of saved strings
updateSavedStrings();
