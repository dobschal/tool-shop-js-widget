import { Widget } from "./index.js";

/**
 * @param {string|(string) => void} url
 * @param {import("./index.js").WidgetConfig} [config]
 * @returns {HTMLElement}
 */
export function Image(url, config = {}) {
    config.tag = config.tag ?? "img";
    if ("attributes" in config) {
        config.attributes.src = url;
    }
    else if ("attr" in config) {
        config.attr.src = url;
    }
    else {
        config.attr = { src: url };
    }
    return Widget(config);
}