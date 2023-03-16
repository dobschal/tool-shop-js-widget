import { it, expect, describe } from "@jest/globals";
import { Input } from "./index.js";

describe("Input widget", () => {
    it("should render the given input", () => {
        const el = Input("yeah", "text", () => {
            console.log("yeah");
        });
        expect(el.tagName.toLowerCase()).toBe("input");
        expect(el.getAttribute("placeholder")).toBe("yeah");
        expect(el.getAttribute("type")).toBe("text");
    });    
});