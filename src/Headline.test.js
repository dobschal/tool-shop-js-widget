import { it, expect, describe } from "@jest/globals";
import { Headline, SubHeadline } from "./index.js";

describe("Headline widget", () => {
    it("should render the given headline as H1 element", () => {
        const el = Headline("yeah");
        expect(el.tagName.toLowerCase()).toBe("h1");
        expect(el.innerText).toBe("yeah");
    });
    it("should render the given headline as h1 element with config", () => {
        const el = Headline("yeah", { style: "some-text" });
        expect(el.className).toBe("some-text");
    });
});

describe("SubHeadline widget", () => {
    it("should render the given subheadline as H2 element", () => {
        const el = SubHeadline("yeah");
        expect(el.tagName.toLowerCase()).toBe("h2");
        expect(el.innerText).toBe("yeah");
    });
    it("should render the given subheadline as h2 element with config", () => {
        const el = SubHeadline("yeah", { style: "some-text" });
        expect(el.className).toBe("some-text");
    });
});