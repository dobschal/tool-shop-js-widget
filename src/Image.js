import { Widget } from "./index.js";

/**
 * @param {import("./index.js").WidgetConfig & { url: string }} config
 * @returns {HTMLElement}
 */
export function Image(config) {
    config.tag = config.tag ?? "img";
    if ("attributes" in config) {
        config.attributes.src = config.url;
    }
    else if ("attr" in config) {
        config.attr.src = config.url;
    }
    else {
        config.attr = { src: config.url };
    }
    delete config.url;
    return Widget(config);
}