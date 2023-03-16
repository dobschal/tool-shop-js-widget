import { Button, Headline, Image, Input, Paragraph, Text, Widget } from "../src/index.js";

let updateText;

Widget({
    parent: document.body,
    children: [
        Headline("Example"),
        Paragraph("Here is a list of all available widgets."),        
        Image((cb) => {
            setInterval(() => cb(getRandomImageUrl()), 3000);
        }),
        Button("Click Me", () => alert("Yeah! You clicked the button.")),
        Text((cb) => updateText = cb),
        Input("Enter some nice text here", "text", (event) => {
            updateText("You entered: '" + event.target.value + "'");
        })
    ],
    onCreate() {
        updateText("Hello");
    }
});

/**
 * @returns {string} - random image url
 */
function getRandomImageUrl() {
    const imageUrls = [
        "https://images.pexels.com/photos/9027260/pexels-photo-9027260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/13250577/pexels-photo-13250577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        "https://images.pexels.com/photos/6341550/pexels-photo-6341550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];
    return imageUrls[Math.floor(Math.random()*imageUrls.length)];
}