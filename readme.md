# JS UI Kit Widget

This library provides an easy to use wrapper to create HTMLElements in your web application. This allows you to build web apps without the direct use of HTML in a declarative way.

[![Tests](https://github.com/dobschal/js-ui-kit-widget/actions/workflows/unit-test.yml/badge.svg)](https://github.com/dobschal/js-ui-kit-widget/actions/workflows/unit-test.yml)

<hr />

## Get Started

### Installation:

Install with [NPM](https://nodejs.dev/en/) using your CLI:
```bash
npm install --save js-ui-kit-widget
```

### Use:
Import ES Module into your JavaScript file and create Widget.
```javascript
import { Widget } from "js-ui-kit-widget";

Widget({
    text: "Hello World",
    // Further options go here...
});
```
<hr />

## Example: Hello World
Load your script as module into a index.html file:
```html
<!-- ... -->
    <script type="module" src="index.js"></script>
</head>
<!-- ... -->
```

Createa index.js file, import the JS UI Kit Widget and render your first Widget to the page:
```javascript
import { Widget } from "js-ui-kit-widget";

Widget({
    parent: document.body,
    text: "Hello World!" 
});
```

Run your app locally with [Parcel](https://parceljs.org) (*You can use any tool like Webpack or Browserify for that.*):
```bash
# Install Parcel globally
npm install -g parcel

# Run app locally:
parcel index.html

# Open your browser at http://localhost:1234
```
<hr />

## Options
All options are optional!

### Tag
Will define the HTML tag to use for the underlaying HTML element. 
```
Default: "div"
Type: string
```
Example:
```javascript
Widget({
    tag: "button"
});
```

### Text
Will define the inner text. 
```
Type: string | ((string) => void) => void
```
Examples:
```javascript
// Pass a string
Widget({
    text: "Hello World"
});

// Pass to callback. Can be used with async actions.
Widget({
    text: async cb => {
        // ... await something async
        cb("Hello World");
    }
});
```
<hr />
