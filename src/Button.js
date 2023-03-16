import { Widget } from "./index.js";

/**
 * @param {string|((string) => void) => void} text 
 * @param {(Event) => void} onClick 
 * @param {import("./index.js").WidgetConfig} [config]
 * @returns {HTMLElement}
 */
export function Button(text, onClick, config = {}) {
    return Widget({
        tag: "button",
        text,
        onClick,
        ...config
    });
}