import { it, expect, describe } from "@jest/globals";
import { Image } from "./index.js";

describe("Image", () => {
    it("should create a HTML element with tag 'img'", () => {
        const url = "http://some-image.de/yeah.jpg";
        const el = Image(url);
        expect(el.getAttribute("src")).toBe(url);
    });
    it("should update the image instance src when providing a callback", () => {
        const url = "http://some-image.de/yeah.jpg";
        const el = Image((cb) => {
            cb(url);
        });
        expect(el.getAttribute("src")).toBe(url);
    });
});