import { Widget } from "./index.js";

/**
 * 
 * @param {string|(string) => void} text 
 * @param {import("./index.js").WidgetConfig} [config]
 */
export function Text(text, config = {}) {
    config.tag = config.tag ?? "span";
    config.text = config.text ?? text;
    return Widget(config);
}