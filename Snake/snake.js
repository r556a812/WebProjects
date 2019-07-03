const cnvs = document.getElementById("myC");
const ctx = cnvs.getContext("2d");

//unit size 
const box = 32;

function draw() {
    /***  Create the checkered pattern to show the play area
     ***  Left the top open to add a score sytem and text area 
     */
    for (var i = 0; i < 19; i++) {
        for (var j = 3; j < 19; j++) {
            if ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) {
                ctx.fillStyle = "rgb(154, 205, 50)";
                ctx.fillRect(i * box, j * box, box, box);
            } else {
                ctx.fillStyle = "rgb(107, 142, 35)";
                ctx.fillRect(i * box, j * box, box, box);
            }

        }
    }

}

var game = setInterval(draw, 100);