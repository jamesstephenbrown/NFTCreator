import jimp from "jimp";
import fs from "fs";

// I wanted to make this example to use async/await properly with Jimp
// So that's why we are using util.promisify to convert fs.readdir
// into a function named readDir, which we can await on
import util from "util";
const readDir = util.promisify(fs.readdir);
// create an array of 6 colors and specify the colors
const colors = [
    {r: 0, g: 255, b: 154, a: 1},
    {r: 255, g: 40, b: 108, a: 1},
    {r: 26, g: 172, b: 255, a: 1},
    {r: 137, g: 91, b: 255, a: 1},
    // {r: 255, g: 190, b: 171, a: 1},
    {r: 255, g: 130, b: 50, a: 1}
];
// {r: 150, g: 255, b: 0, a:255}
// Input and output folder names

const inputFolderNames = ["./Faces","./Scenes","./Details"];
const outputFolderName = "/Colored";
// console.log("inputFolderName" + inputFolderNames[0]);

// We're using async/await, so must wrap top level code like this
// https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level
(async () => {
    var index = 0;
    for (let folderName of inputFolderNames) {
        // Get filenames of the png files in the specified folder
        let pngFileNames = await readDir(folderName);
        
        // Optional filtering of only .png files
        pngFileNames = pngFileNames.filter((f) => f.includes(".png"));

        console.log("pngFileNames" + pngFileNames);

        // Go through each file
        // Must use for...of loop here, because we have awaits inside the loop

        for (let fileName of pngFileNames) {
            console.log("fileName" + fileName);
            console.log("folderName" + folderName);

            // loop through colors
            for (index = 0; index < colors.length; index++) {

                // Make an actual Jimp image object from the file
                const jimpImage = await jimp.read(`${folderName}/${fileName}`);

                // Apply the color operations
                // Define which color operations we want to do.
                // https://www.npmjs.com/package/jimp#colour-manipulation
                jimpImage.color([
                    { apply: 'mix', params: [colors[index], 60] },
                ]);
                console.log(colors[index]);
                
                // Write the edited image to out folder
                console.log(`${folderName+outputFolderName}/${index+fileName}`)
                await jimpImage.writeAsync(`${folderName + outputFolderName}/${"C" + index + "F" + inputFolderNames.indexOf(folderName,0) + "I" + pngFileNames.indexOf(fileName,0)+".png"}`);
            }
        }
    }

})();