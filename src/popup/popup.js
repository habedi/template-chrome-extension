// This function contains the core logic and is exported for testing.
export function initializePopup() {
    const myButton = document.getElementById("myButton");
    if (myButton) {
        myButton.addEventListener("click", () => {
            alert("Button was clicked!");
        });
    }
}

// This runs the logic when the popup's HTML has loaded.
document.addEventListener("DOMContentLoaded", initializePopup);
