const cnvs = document.getElementById("myC");
const ctx = cnvs.getContext("2d");

//unit size 
const box = 32;

//Initialize starting score to 0
var score = 0;

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
var newGame = true;

function direction(event) {

    if (event.keyCode == 37 && next_x != box) { //Left
        next_x = -box;
        next_y = 0;
        newGame = false;

    } else if (event.keyCode == 38 && next_y != box) { //Up
        next_x = 0;
        next_y = -box;
        newGame = false;

    } else if (event.keyCode == 39 && next_x != -box) { //Right
        next_x = box;
        next_y = 0;
        newGame = false;

    } else if (event.keyCode == 40 && next_y != -box) { //Down
        next_x = 0;
        next_y = box;
        newGame = false;

    }

}

function collision(head, snakeArray) {
    for (var i = 1; i < snakeArray.length; i++) {
        if (head.x == snakeArray[i].x && head.y == snakeArray[i].y) {
            return true;
        }

    }

    return false;
}

function restartGame() {
    var playAgain = confirm("Play again?");
    if (playAgain) {
        document.location.reload(false);
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
                ctx.fillStyle = "limegreen";
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

    //Draw the title with a Gradient
    ctx.font = "45px Changa one";
    var gradient = ctx.createLinearGradient(7 * box, box, 12 * box, 2 * box);
    gradient.addColorStop("0", "Red");
    gradient.addColorStop("0.5", "Orange");
    gradient.addColorStop("1", "Yellow");
    ctx.fillStyle = gradient;
    ctx.fillText("SNAKE ", 7 * box, 2 * box);

    //Draw the Score
    ctx.fillStyle = "Black";
    ctx.font = "24px Changa one";
    ctx.fillText("SCORE: " + score, 14.5 * box, 2.5 * box);

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

    //Wait for user to press arrow key to start
    if (newGame) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, cnvs.width, cnvs.height);
        ctx.fillStyle = "white";
        ctx.font = "24px Verdana";
        ctx.fillText("Press any arrow key to begin!", 4 * box, 8 * box);

    } else {
        //Old position
        snake_x = snake[0].x;
        snake_y = snake[0].y;

        //If eat the food dont pop tail and get next random food place, else pop
        if (snake[0].x == food.x && snake[0].y == food.y) {

            food_x = Math.floor(Math.random() * 17 + 1) * box; //Game board width is 17 boxes with offset of 1 because of the border
            food_y = Math.floor(Math.random() * 15 + 3) * box; //Game board height is 15 boxes with offset of 3 because of the title area
            food = { x: food_x, y: food_y };

            score++;

        } else {

            snake.pop();
        }

        //Add new head
        snake_x += next_x;
        snake_y += next_y;
        var new_head = {
            x: snake_x,
            y: snake_y
        }
        snake.unshift(new_head);
    }


    // Game over
    if (snake[0].x < box || snake[0].x > 17 * box || snake[0].y < 3 * box || snake[0].y > 17 * box || collision(new_head, snake)) {
        clearInterval(game);
        restartGame();
    }

}


var game = setInterval(draw, 200);