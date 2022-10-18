import { Widget } from "./index.js";

/**
 * @param {import("./index.js").WidgetConfig} config 
 */
export function List(config) {
    config.tag = config.tag ?? "ul";
    return Widget(config);
}