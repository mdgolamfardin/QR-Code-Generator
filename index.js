/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import fs from "fs";
import qr from "qr-image"

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            name: "url",
            message: "What is the url of your site?"
        },
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(answers.url);
        fs.writeFile("url2.txt", answers.url, "utf-8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
        });
        const qrThing = qr.image(answers.url, { type: "png" });
        const output = fs.createWriteStream('qrcode.png');
        qrThing.pipe(output);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });


