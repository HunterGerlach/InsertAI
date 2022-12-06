// Get the input element for the string
var input = document.getElementById("string-input");

// Get the save button
var saveButton = document.getElementById("save-button");

if (saveButton) {
  // Add event listeners
  addEventListeners();
}

// Define a function to add event listeners
function addEventListeners() {
  // Add an event listener for the click event on the save button
  saveButton.addEventListener("click", function () {
    // Save the string from the input element
    saveString(input.value);
    // Clear the input element
    input.value = "";
  });

  // Add an event listener for the keydown event on the input element
  input.addEventListener("keydown", function (event) {
    // Check if the key pressed is the "Enter" key
    if (event.key === "Enter") {
      // Save the string from the input element
      saveString(input.value);
      // Clear the input element
      input.value = "";
    }
  });
}
