import { Widget } from "./index.js";

/**
 * @param {string} text 
 * @param {import("./index.js").WidgetConfig} config 
 * @returns {HTMLParagraphElement}
 */
export function Paragraph(text, config = {}) {
    return Widget({
        tag: "p",
        text,
        ...config
    });
}