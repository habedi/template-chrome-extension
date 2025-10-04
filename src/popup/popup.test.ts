import { describe, test, expect, beforeEach, vi } from "vitest";
import { initializePopup } from "./popup";

describe("Popup Logic", () => {
    beforeEach(() => {
        // Set up a basic HTML structure for each test.
        document.body.innerHTML = '<button id="myButton">Click Me</button>';

        // Spy on window.alert
        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    test("should add a click listener that calls alert", () => {
        initializePopup();
        const button = document.getElementById("myButton") as HTMLButtonElement;
        button.click();
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Button was clicked!");
    });

    test("should not throw an error if the button does not exist", () => {
        document.body.innerHTML = "";
        expect(() => initializePopup()).not.toThrow();
    });
});
