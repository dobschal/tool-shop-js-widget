import { it, expect, describe } from "@jest/globals";
import { Paragraph } from "./Paragraph.js";

describe("Paragraph widget", () => {
    it("should render the given text as p element", () => {
        const el = Paragraph("yeah");
        expect(el.tagName.toLowerCase()).toBe("p");
        expect(el.innerText).toBe("yeah");
    });
    it("should render the given text as p element with config", () => {
        const el = Paragraph("yeah", { style: "some-text" });
        expect(el.className).toBe("some-text");
    });
});