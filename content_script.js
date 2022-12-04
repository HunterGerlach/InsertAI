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
  
  // Add a message listener that listens for messages from the popup and calls the handleMessage() function
  chrome.runtime.onMessage.addListener(handleMessage);
  