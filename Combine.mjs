import jimp from "jimp";
import fs from "fs";


// edit this number to match the number of colors
var maxColors = 5;

// these values are affected by the terminal args add mono duo or tri after the terminal command to set
var drawMono = false;
var drawDuo = false;
var drawTri = false;
var randomise = false;

// print process.argv
process.argv.forEach(function (val, index, array) {

    drawMono = val == "mono" ? true : drawMono;
    drawDuo = val == "duo" ? true : drawDuo;
    drawTri = val == "tri" ? true : drawTri;
    randomise = val == "randomise" ? true : randomise;

});
CombineImagesFrom3Folders("Scenes/Colored/","Faces/Colored/","Details/Colored/");

function CombineImagesFrom3Folders(folder1, folder2, folder3) {
    var pngFiles1 = CreatePNGArrayFromFolder(folder1);
    var pngFiles2 = CreatePNGArrayFromFolder(folder2);
    var pngFiles3 = CreatePNGArrayFromFolder(folder3);
    DrawImagesOnTopOfEachOther(pngFiles1, pngFiles2,pngFiles3);
}
function CreatePNGArrayFromFolder(folder) {
    var pngFiles = [];
    const newLocal = fs.readdirSync(folder);
    var files = newLocal;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.split(".").pop() == "png") {
            pngFiles.push(folder + "/" + file);
        }
    }
    return pngFiles;
}
function DrawImagesOnTopOfEachOther(pngs1, pngs2, pngs3) {
    console.log("Running: this will take a few minutes before you see any output");
    var name = "";
    for (var i = 0; i < pngs1.length; i++) {
        for (var j = 0; j < pngs2.length; j++) {
            for(var k = 0; k < pngs3.length; k++){
                // compositing the images
                var rand = randomise ? (('0000'+(Math.floor(Math.random() * 1000))).slice(-4)) : "";

                name = (rand + "S" + i + "F" + j + "D" + k + ".png");

                var iInc = pngs1.length / maxColors;
                var jInc = pngs2.length / maxColors;
                var kInc = pngs3.length / maxColors;

                var tri = true;
                var mono = false;

                for (var m = 1; m < maxColors+1; m++) {
                    tri = (i < iInc*m && j < jInc*m && i >= iInc*(m-1) && j >= jInc*(m-1))
                    || (i < iInc*m && k < kInc*m && i >= iInc*(m-1) && k >= kInc*(m-1))
                    || (j < jInc*m && k < kInc*m && j >= jInc*(m-1) && k >= kInc*(m-1)) ? false: tri;

                    mono = (i < iInc*m && j < jInc*m && i >= iInc*(m-1) && j >= jInc*(m-1))
                    && (i < iInc*m && k < kInc*m && i >= iInc*(m-1) && k >= kInc*(m-1))
                    && (j < jInc*m && k < kInc*m && j >= jInc*(m-1) && k >= kInc*(m-1)) ? true: mono;
                }

                if (mono) {
                    if (drawMono) {
                        name = "Combined_Mono/" + name;
                        Draw (pngs1, pngs2, pngs3,i,j,k, name);
                    }
                } else if (tri) {
                    if (drawTri) {
                        name = "Combined_Tri/" + name;
                        Draw (pngs1, pngs2, pngs3,i,j,k, name);
                    }
                } else {
                    if (drawDuo) {
                        name = "Combined_Duo/" + name;
                        Draw (pngs1, pngs2, pngs3,i,j,k, name);
                    }
                }
            }
        }
    }
}
function Draw (pngs1, pngs2, pngs3,i,j,k, name) {
    jimp.read(pngs1[i])
    .then(image1 => {
        jimp.read(pngs2[j])
        .then(image2 => {
            jimp.read(pngs3[k])
            .then(image3 => {
                image1.composite(image2, 0, 0, {
                    mode: jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
                image1.composite(image3, 0, 0, {
                    mode: jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
                image1.write(name);
                console.log("Image " + name + " created");
            })
        })
    }) 
}