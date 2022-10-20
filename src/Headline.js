import { Widget } from "./index.js";

/**
 * 
 * @param {string|(string) => void} text 
 * @param {import("./index.js").WidgetConfig} config 
 */
export function Headline(headline, config = {}) {
    config.tag = config.tag ?? "h2";
    config.text = config.text ?? headline;
    return Widget(config);
}