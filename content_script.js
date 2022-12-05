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

  // Add a listener for the message event
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the action is "insertString"
    if (message.action === 'insertString') {
      // Get the currently selected element
      var selectedElement = document.activeElement;
  
      // Check if the selected element is a form element
      if (selectedElement && (selectedElement.tagName === 'INPUT' || selectedElement.tagName === 'TEXTAREA')) {
        // If the selected element is a form element, insert the string into the element
        selectedElement.value += message.string;
      } else {
        // If no form element is selected, show an error message
        alert('Please select a text field or text area to insert the string into.');
      }
    }
  });
  
  // Add an event listener for the keydown event on textarea elements on the webpage
document.addEventListener('keydown', function(event) {
    // Check if the event target is a textarea element on the webpage
    if (event.target.tagName === 'TEXTAREA') {
      // Check if the key pressed is the Enter key
      if (event.key === 'Enter') {
        // Extract the text from the element
        var text = event.target.value;
  
        // Save the text as a new string
        saveString(text);
      }
    }
  }, true, 'http://*/*', 'https://*/*');
   