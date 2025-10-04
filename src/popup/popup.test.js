import { describe, test, expect, beforeEach, vi } from "vitest";
import { initializePopup } from "./popup.js";

describe("Popup Logic", () => {
    beforeEach(() => {
        // Set up a basic HTML structure for each test.
        document.body.innerHTML = '<button id="myButton">Click Me</button>';

        // We need to "spy" on the window.alert function to check if it gets called.
        // This replaces the real alert with a mock function for the test.
        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    test("should add a click listener that calls alert", () => {
        // Run the function that sets up our event listeners.
        initializePopup();

        // Find the button in our fake DOM and simulate a click.
        const button = document.getElementById("myButton");
        button.click();

        // Assert that our mock alert was called exactly once with the correct message.
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Button was clicked!");
    });

    test("should not throw an error if the button does not exist", () => {
        // Make the button unavailable in the DOM.
        document.body.innerHTML = "";

        // We expect that running the initializer without the button does not cause a crash.
        expect(() => initializePopup()).not.toThrow();
    });
});
