import { Widget } from "./index.js";

export function Input(placeholder, type, onInput, config = {}) {
    config.attributes = config.attributes ?? (config.attr ?? {});
    if(config.attr) delete config.attr;
    config.attributes.placeholder = placeholder;
    config.attributes.type = type;
    return Widget({
        tag: "input",
        onInput,
        ...config
    });
}