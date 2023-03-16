/**
 * @typedef {Object} WidgetConfig
 * @property {string | ((string) => void) => void} [text] - innerText of the HTML element
 * @property {string} [tag] - like "div", "button", "ul", etc.
 * @property {{[string]: string|((string) => void) => void}} [attributes] - attributes to be set on the actual HTML element
 * @property {{[string]: string|((string) => void) => void}} [attr] - shortcut for attributes
 * @property {HTMLElement | (callback: (HTMLElement) => void) => void} [child]
 * @property {Array<HTMLElement> | (callback: (Array<HTMLElement>) => void) => void} [children]
 * @property {HTMLElement} [parent] - the HTML element this widget should be attached too immediately
 * @property {string | ((string) => void) => void} style
 * @property {Array<string> | ((Array<string>) => void) => void} styles
 * @property {(Event) => void} onClick
 * @property {(Event) => void} onCreate
 * @property {(Event) => void} onSubmit
 * @property {(Event) => void} onKeyUp
 * @property {(Event) => void} onKeyDown
 * @property {(Event) => void} onMouseMove
 * @property {(Event) => void} onMouseDown
 * @property {(Event) => void} onMouseUp
 */

export { Image } from "./Image.js";
export { Text } from "./Text.js";
export { Headline, SubHeadline } from "./Headline.js";
export { Paragraph } from "./Paragraph.js";
export { Button } from "./Button.js";
export { Input } from "./Input.js";

/**
 * @param {WidgetConfig} config 
 * @returns {HTMLElement}
 */
export function Widget(config = {}) {
    const htmlElement = document.createElement(config.tag ?? "div");
    delete config.tag;

    //  If we call "slots" on a parent element, we might need 
    //  to find the child elemenmt with the wanted slot.
    //  So we grab a Proxy to chain thru the children and return the actual
    //  slot handler function.
    htmlElement.slots = new Proxy({}, {
        get(target, key) {
            for (let i = 0; i < htmlElement.children.length; i++) {
                const child = htmlElement.children[i];
                if (child.slots && typeof child.slots[key] === "function") {
                    return child.slots[key];
                }
            }
        }
    });

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
     */
    slot(htmlElement, config) {
        htmlElement.slots = {};
        htmlElement.slots[config.slot] = (...children) => {
            htmlElement.innerHTML = "";
            htmlElement.append(...children);
        };
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    if(htmlElement, config) {
        if (typeof config.if === "function") {
            return config.if(i => _handlers.if(htmlElement, { if: i }));
        }
        setTimeout(() => {
            if (!config.if && htmlElement.parentNode) {
                htmlElement.oldParentNode = htmlElement.parentNode;
                htmlElement.oldIndex = Array.from(htmlElement.parentNode.children).indexOf(htmlElement);
                htmlElement.parentNode.removeChild(htmlElement);
            } else if (config.if && htmlElement.oldParentNode && !htmlElement.parentNode) {
                htmlElement.oldParentNode.insertBefore(htmlElement, htmlElement.oldParentNode.children[htmlElement.oldIndex]);
            }
        });
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     * @param {'attr'|'attributes'} key
     */
    attributes(htmlElement, config, key) {
        for (const attributeName in config[key]) {
            if (Object.hasOwnProperty.call(config[key], attributeName)) {
                if (typeof config[key][attributeName] === "function") {
                    config[key][attributeName]((attributeValue) => { 
                        const option = {};
                        option[key] = {};
                        option[key][attributeName] = attributeValue;
                        _handlers.attributes(htmlElement, option, key);
                    });
                    continue;
                }
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
        if (eventName.toLowerCase() === "oncreate") {
            return config[eventName].call(htmlElement);
        }
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
    style(htmlElement, config) {
        if (typeof config.style === "function") {
            return config.style(style => _handlers.style(htmlElement, { style }));
        }
        htmlElement.className = config.style;
    },

    /**
     * @param {HTMLElement} htmlElement 
     * @param {WidgetConfig} config 
     */
    styles(htmlElement, config) {
        if (typeof config.styles === "function") {
            return config.styles(styles => _handlers.styles(htmlElement, { styles }));
        }
        htmlElement.className = "";
        config.styles.forEach(style => {
            htmlElement.classList.add(style);
        });
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
};

/**
 * @param {HTMLElement} element 
 * @returns {boolean} - true if element removed
 */
Widget.remove = function(element) {
    if(!element || !element.parentNode) {
        return false;
    }
    element.parentElement.removeChild(element);
};