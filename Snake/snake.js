const cnvs = document.getElementById("myC");
const ctx = cnvs.getContext("2d");

//unit size 
const box = 32;

//Create the snake
var snake = [];
snake[0] = { x: 9 * box, y: 10 * box }
snake[1] = { x: 8 * box, y: 10 * box }

//Create the food 
//Note: 608/32 = 19x19 "boxes" in the screen. 
var food_x = Math.floor(Math.random() * 17 + 1) * box; //Game board width is 17 boxes with offset of 1 because of the border
var food_y = Math.floor(Math.random() * 15 + 3) * box; //Game board height is 15 boxes with offset of 3 because of the title area
var food = { x: food_x, y: food_y };

//Listen for input to control the snake
document.addEventListener("keydown", direction);
var next_x, next_y;
next_x = box;
next_y = 0;

function direction(event) {

    if (event.keyCode == 37) { //Left
        next_x = -box;
        next_y = 0;

    } else if (event.keyCode == 38) { //Up
        next_x = 0;
        next_y = -box;

    } else if (event.keyCode == 39) { //Right
        next_x = box;
        next_y = 0;

    } else if (event.keyCode == 40) { //Down
        next_x = 0;
        next_y = box;

    }
}

//Function to draw to the canvas
function draw() {
    /***  Create the checkered pattern to show the play area
     ***  Left a border around game area to better see if snake
     ***  will touch the borders.  Also left more off the top to add 
     ***  score board or just the name of the game. 
     */
    for (var column = 0; column < 19; column++) {
        for (var row = 0; row < 19; row++) {
            if (column == 0 || row < 3 || column == 18 || row == 18) {
                ctx.fillStyle = "rgb(0, 128, 0)";
                ctx.fillRect(column * box, row * box, box, box);
            } else if ((column % 2 == 0 && row % 2 == 1) || (column % 2 == 1 && row % 2 == 0)) {
                ctx.fillStyle = "rgb(154, 205, 50)";
                ctx.fillRect(column * box, row * box, box, box);
            } else {
                ctx.fillStyle = "rgb(173, 255, 47)";
                ctx.fillRect(column * box, row * box, box, box);
            }

        }
    }

    //Draw the snake. Head is black with white outline, body is white with black outline
    for (var i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
        } else {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //Draw the food. Red block for now
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    //Old position
    snake_x = snake[0].x;
    snake_y = snake[0].y;

    //Remove the tail
    snake.pop();

    //Add new head
    snake_x += next_x;
    snake_y += next_y;
    var new_head = {
        x: snake_x,
        y: snake_y
    }
    snake.unshift(new_head);


}

var game = setInterval(draw, 500);