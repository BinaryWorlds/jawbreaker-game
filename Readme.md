# Introduction

- Click on two or more adjacent balls of the same color.
- For each group of N balls, you will earn n \* (n-1) points.
- The balls are falling down.
- When you delete an entire column, the rest will move to the left.

**Good luck!**

# Start

Play online:
https://htmlpreview.github.io/?https://github.com/BinaryWorlds/jawbreaker-game/master/index.html

or:

1. Download repo.
2. Unpack the file.
3. Run index.html

# Add to your website:

1. Copy all files to your source code.
2. Change the path to images folder in jawbreaker.js file.
   (in function imageSrc() )
3. Add script to your code and create canvas with id="gameArea"
   (example in index.html)

   `<canvas id="gameArea"></canvas>`

   `<script type="text/javascript" defer src="./jawbreaker.js"></script>`

4. At the bottom of jawbreaker file is line:

   `newGame(12, 12, 5, 60);`

   It means: 12 columns, 12 rows, 5 colors, 60 px ball size.
   You can set any other values, but **maximum nr of colors is 5**.

   Of course you can delete this line and call newGame() from your code.

5. If you want more type of balls, create it in png format and with next number in order.
6. You can call resetGame() to start again.
