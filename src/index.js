/**
 * @typedef {Object} WidgetConfig
 * @property {string | ((string) => void) => [string]} text
 * @property {string} tag
 * @property {HTMLElement | (callback: (HTMLElement) => void) => void} child
 * @property {Array<HTMLElement> | (callback: (Array<HTMLElement>) => void) => void} children
 */

/**
 * @param {WidgetConfig} config 
 * @returns {HTMLElement}
 */
export function Widget(config = {}) {
    const htmlElement = document.createElement(config.tag ?? "div");
    delete config.tag;
    for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
            const isAttributes = key === "attr" || key === "attributes";
            if (isAttributes) {
                _handlers.attributes(htmlElement, config, key);
                continue;
            }
            const isEventHandler = key.startsWith("on");
            if (isEventHandler) {
                _handlers.event(htmlElement, config, key);
                continue;
            }
            if (typeof _handlers[key] !== "function") {
                throw new Error(`[Widget] Unsupported key '${key}' in parameter 1 (config) for Widget(config).`);
            }
            _handlers[key](htmlElement, config);
        }
    }
    return htmlElement;
}

const _handlers = {

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     * @param {string} key
     */
    attributes(htmlElement, config, key) {
        for (const attributeName in config[key]) {
            if (Object.hasOwnProperty.call(config[key], attributeName)) {
                const attributeValue = config[key][attributeName];
                htmlElement.setAttribute(attributeName, attributeValue);
            }
        }
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     * @param {string} eventName
     */
    event(htmlElement, config, eventName) {
        htmlElement.addEventListener(eventName.toLowerCase().substring(2), config[eventName]);
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    parent(htmlElement, config) {
        config.parent.append(htmlElement);
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    text(htmlElement, config) {
        if (typeof config.text === "function") {
            return config.text(text => _handlers.text(htmlElement, { text }));
        }
        htmlElement.innerText = config.text;
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    child(htmlElement, config) {
        if (typeof config.child === "function") {
            return config.child(child => _handlers.child(htmlElement, { child }));
        }
        htmlElement.innerHTML = "";
        htmlElement.append(config.child);
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    children(htmlElement, config) {
        if (typeof config.children === "function") {
            return config.children(children => _handlers.children(htmlElement, { children }));
        }
        htmlElement.innerHTML = "";
        htmlElement.append(...config.children);
    }
}