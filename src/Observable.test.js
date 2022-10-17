import { Observable } from "./Observable.js";
import { jest, it, expect, describe } from '@jest/globals';

describe("Observable", () => {
    it("should call the subscriber if value changes", () => {
        const observableData = Observable({
            text: "yeah"
        });
        observableData.$on("text", newText => {
            expect(newText).toBe("uuuh");
        });
        observableData.text = "uuuh";
    });
});