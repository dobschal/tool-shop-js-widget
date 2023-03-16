import { jest, it, expect, describe } from "@jest/globals";
import { Button } from "./index.js";

describe("Button widget", () => {

    it("should render the given button", () => {
        const el = Button("yeah", () => {
            console.log("yeah");
        });
        expect(el.tagName.toLowerCase()).toBe("button");
        expect(el.innerText).toBe("yeah");
    });
    
    it("should call the onClick callback on click", () => {
        const fn = jest.fn();
        const el = Button("yeah", fn);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        el.dispatchEvent(evt);
        expect(fn).toBeCalledTimes(1);
    });
});