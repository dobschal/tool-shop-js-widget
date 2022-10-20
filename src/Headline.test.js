import { it, expect, describe } from "@jest/globals";
import { Headline } from "./index.js";

describe("Headline widget", () => {
    it("should render the given headline as H2 element", () => {
        const el = Headline("yeah");
        expect(el.tagName.toLowerCase()).toBe("h2");
        expect(el.innerText).toBe("yeah");
    });
    it("should render the given headline as h2 element with config", () => {
        const el = Headline("yeah", { style: "some-text" });
        expect(el.className).toBe("some-text");
    });
});