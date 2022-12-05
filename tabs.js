// Get all elements with the "tab" class
var tabs = document.querySelectorAll(".tab");

// Loop through the tab elements
for (var i = 0; i < tabs.length; i++) {
  // Add a click event listener to each tab
  tabs[i].addEventListener("click", function () {
    // Get the ID of the tab to show
    var tabId = this.dataset.tabId;

    // Get the tab content element to show
    var tabContent = document.getElementById(tabId);

    // Get all tab content elements
    var tabContentItems = document.querySelectorAll(".tab-content-item");

    // Loop through the tab content elements
    for (var i = 0; i < tabContentItems.length; i++) {
      // If the current tab content element is the one to show, add the "active" class to it
      if (tabContentItems[i] === tabContent) {
        tabContentItems[i].classList.add("active");
      } else {
        // Otherwise, remove the "active" class from the element
        tabContentItems[i].classList.remove("active");
      }
    }
  });
}
