# NFTCreator
A simple solution for creating 1000s of unique NFTs

These javascript files will combine a set of PNG elements to create every possible variation like in this example nonzerosum.games/friendgibles. Simply place your image elements in the corresponding folders 'Details' (top layer), 'Faces' (mid layer), 'Scenes' (background layer). Each folder needs to have within it a 'Colored' folder.

I would advise having no more than 5 elements in each folder as you will get exponentially large numbers of variations. If you create too many I have found you may crash the program. For this reason I have made it possible to output tri-colored, dual-colored and mono-colored separately.

Open a terminal window from the NFT Creator folder.
Install node:
  pip3 node install
Run the Colorise.mjs script: node Colorise.mjs

You can choose what type of coloring you want when you combine the pictures.

Run the Combine.mjs script:
  node Combine.mjs mono
Run the Combine.mjs script:
  node Combine.mjs duo
Run the Combine.mjs script:
  node Combine.mjs tri

If you would like them to be ordered randomly (with a random number at the front of the file name) add 'rand' to the terminal command:
  node Combine.mjs tri rand

That's it, enjoy.
