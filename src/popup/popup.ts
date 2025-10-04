// This function contains the core logic and is exported for testing.
export function initializePopup(): void {
    const myButton = document.getElementById("myButton") as HTMLButtonElement | null;
    if (myButton) {
        myButton.addEventListener("click", () => {
            alert("Button was clicked!");
        });
    }
}

// This runs the logic when the popup's HTML has loaded.
document.addEventListener("DOMContentLoaded", initializePopup);
