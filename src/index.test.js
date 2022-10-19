import { Widget } from "./index.js";
import { jest, it, expect, describe } from "@jest/globals";

describe("Widget", () => {

    it("should set children from callback", () => {
        const el = Widget({
            children: cb => cb([Widget({
                text: "yeah"
            })])
        });
        expect(el.childNodes[0].innerText).toBe("yeah");
    });

    it("should set text passed to the callback", () => {
        const el = Widget({
            text: (cb) => {
                cb("Nice Text");
            }
        });
        expect(el.innerText).toBe("Nice Text");
    });

    it("should return an instance of HTMLElement with tag div as default", () => {
        const el = Widget();
        expect(el instanceof HTMLElement).toBeTruthy();
        expect(el.tagName.toLowerCase()).toBe("div");
    });

    it("should set the given text as innerText", () => {
        const testString = "Yeah";
        const el = Widget({
            text: testString
        });
        expect(el.innerText).toBe(testString);
    });

    it("should call onclick callback", () => {
        const onClickMock = jest.fn();
        const el = Widget({
            tag: "button",
            onClick: onClickMock
        });
        el.click();
        expect(onClickMock).toBeCalled();
    });

    it("should add the widget to the given HTML parent element", () => {
        const parent = document.createElement("div");
        const el = Widget({ parent });
        expect(el).toBe(parent.children[0]);
    });

    it("should add a child", () => {
        const el = Widget({
            child: Widget({
                text: "yeah"
            })
        });
        expect(el.children[0].innerText).toBe("yeah");
    });

    it("should add children", () => {
        const el = Widget({
            children: [Widget({
                text: "yeah"
            }), Widget({
                text: "yeah2"
            })]
        });
        expect(el.children[0].innerText).toBe("yeah");
        expect(el.children[1].innerText).toBe("yeah2");
    });

    it("should set attributes", () => {
        const el = Widget({
            attr: {
                id: "yeah"
            }
        });
        expect(el.getAttribute("id")).toBe("yeah");
    });

    it("should add style CSS class", () => {
        const el = Widget({
            style: "button btn-success"
        });
        expect(el.className).toBe("button btn-success");
    });

    it("should add styles passed as array", () => {
        const el = Widget({
            styles: ["button", "btn-success"]
        });
        expect(el.className).toBe("button btn-success");
    });

    it("should add styles passed by function callback", () => {
        const el = Widget({
            styles: cb => cb(["button", "btn-primary"])
        });
        expect(el.className).toBe("button btn-primary");
    });

    it("should call on create", () => {
        const onCreate = jest.fn();
        Widget({
            onCreate
        });
        expect(onCreate).toBeCalledTimes(1);
    });

    it("should call on create before element is attached to parent", () => {
        const el = Widget({
            child: Widget({
                onCreate() {
                    expect(this instanceof HTMLElement).toBeTruthy();
                    expect(this.parentNode).toBeFalsy();
                    this.className = "yeah";
                }
            })
        });
        expect(el.children[0].className).toBe("yeah");
    });

    it("should not render an element with if set to false", () => {
        const el = Widget({
            child: Widget({
                if: false
            })
        });
        setTimeout(() => {
            expect(el.children.length).toBe(0);
        });
    });

    it("should render an element with if set to true", () => {
        const el = Widget({
            child: Widget({
                if: true
            })
        });
        setTimeout(() => {
            expect(el.children.length).toBe(1);
        });
    });

    it("should not render an element with if set to false via callback", () => {
        const el = Widget({
            child: Widget({
                if(cb) {
                    cb(false);
                }
            })
        });
        setTimeout(() => {
            expect(el.children.length).toBe(0);
        });
    });

    it("should render an element with if set to true via callback", () => {
        const el = Widget({
            child: Widget({
                if(cb) {
                    cb(true);
                }
            })
        });
        setTimeout(() => {
            expect(el.children.length).toBe(1);
        });
    });

    it("should add the element later at same position when if changed", async () => {
        await new Promise((resolve, reject) => {
            const el = Widget({
                children: [
                    Widget({ text: "yeah-1" }),
                    Widget({
                        text: "yeah-2",
                        if(cb) {
                            cb(false);
                            setTimeout(() => {
                                cb(true);
                                setTimeout(() => {
                                    try {
                                        expect(el.children[0].innerText).toBe("yeah-1");
                                        expect(el.children[1].innerText).toBe("yeah-2");
                                        expect(el.children[2].innerText).toBe("yeah-3");
                                        expect(el.children.length).toBe(3);
                                        resolve();
                                    } catch (e) {
                                        reject(e);
                                    }
                                });
                            }, 100);
                        }
                    }),
                    Widget({ text: "yeah-3" })
                ]
            });
            setTimeout(() => {
                expect(el.children.length).toBe(2);
            });
        });
    });

    it("should change a child element in a slot correctly", () => {
        const el = Widget({
            children: [
                Widget({
                    style: "header"
                }),
                Widget({
                    slot: "default",
                    style: "content",
                    text: "content here..."
                }),
                Widget({
                    style: "footer"
                })
            ]
        });
        expect(el.children[1].children.length).toBe(0);
        el.slots.default(Widget({
            text: "Bammm"
        }));
        console.log("Children: ", el.children.length);
        expect(el.children[1].children[0].innerText).toBe("Bammm");
    });
});