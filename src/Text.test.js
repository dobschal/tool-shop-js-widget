import { it, expect, describe } from "@jest/globals";
import { Text } from "./index.js";

describe("Text widget", () => {
    it("should render the given text as SPAN element", () => {
        const el = Text("yeah");
        expect(el.tagName.toLowerCase()).toBe("span");
        expect(el.innerText).toBe("yeah");
    });
    it("should render the given text as SPAN element with config", () => {
        const el = Text("yeah", { style: "some-text" });
        expect(el.className).toBe("some-text");
    });
});