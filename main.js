let game = document.querySelector('#game-canvas');
let ctx = game.getContext('2d');
let play = document.querySelector('#bottom-right');
let text = document.querySelector('#bottom-center');
let runGame;
let playerOneScore = 0;
let playerTwoScore = 0;
let difficulty;
let speed;

//Radio Button Values
    //Form
document.getElementById('easy').addEventListener('click', function easy() {
    difficulty = 20;
    console.log(difficulty);
})
document.getElementById('medium').addEventListener('click', function medium() {
    difficulty = 30;
    console.log(difficulty);
})
document.getElementById('hard').addEventListener('click', function hard() {
    difficulty = 40;
    console.log(difficulty);
})

document.getElementById('slow').addEventListener('click', function slow() {
    speed = 2;
    console.log(speed);
})
document.getElementById('med').addEventListener('click', function med() {
    speed = 3;
    console.log(speed);
})
document.getElementById('fast').addEventListener('click', function fast() {
    speed = 5;
    console.log(speed);
})

let playerOne;
let playerTwo;
let asteroidOne;
let arr = [];

window.addEventListener('load', function () {
    game.setAttribute('height', getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
});


    //Objects
class plane {
    constructor(x1, y1, x2, y2, x3, y3, color) {
        this.x1 = x1; //front
        this.y1 = y1;
        this.x2 = x2; //back left
        this.y2 = y2;
        this.x3 = x3; //back right
        this.y3 = y3;
        this.movement = 'stop';
        this.color = color;
        this.alive = true;

        this.render = function () {
            ctx.fillStyle = this.color //change the color of the context(ctx)
            var triangle1 = new Path2D();
            triangle1.moveTo(this.x1, this.y1);
            triangle1.lineTo(this.x2, this.y2);
            triangle1.lineTo(this.x3, this.y3);
            ctx.fill(triangle1);
        }
    }
}

class asteroid {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.start = 0;
        this.end = 2 * Math.PI;
        this.statement = false;
        this.direction = 'r';
        this.speed = speed;

        this.render = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.start, this.end, this.statement);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
}




    // 2 Player
play.addEventListener('click', function start2Player() {
//creating ships
    document.querySelector('#beginning-title').classList.add('hidden');
    clearInterval(runGame);
    let playerOneScore = 0
    let playerTwoScore = 0
    document.querySelector('#score1').textContent = playerOneScore;
    document.querySelector('#score2').textContent = playerTwoScore;
    arr.length = 0
    playerOne = new plane(145, 500, 140, 530, 150, 530, 'white');
    playerOne.render();
    playerTwo = new plane(442, 500, 437, 530, 447, 530, 'gray');
    playerTwo.render();

//movement of players
    document.addEventListener('keypress', playerMovement);
    document.addEventListener('keyup', playerStop);
    
//asteroid
    createAsteroid();

//Collision
    collisionPlayerOne();
    collisionPlayerTwo();
    playerOneWin();
    playerTwoWin();
    playerOneWon();
    playerTwoWon();
//Win Conditions
    function playerOneWin() {
        if (playerOne.y1 < 1) {
            resetPlayerOne();
            document.querySelector('#score1').textContent = playerOneScore += 1
        }
        return;
    }
    function playerTwoWin() {
        if (playerTwo.y1 < 1) {
            resetPlayerTwo();
            document.querySelector('#score2').textContent = playerTwoScore += 1
        }
        return;
    }
//Player Won
    function playerOneWon() {
        if (playerOneScore === 5) {
            text.textContent = "Player One Wins"
            ctx.clearRect(0, 0, game.width, game.height);
        }
        return;
    }
    function playerTwoWon() {
        if (playerTwoScore === 5) {
            text.textContent = "Player Two Wins"
            ctx.clearRect(0, 0, game.width, game.height);
        }
        return;
    }      

    
        runGame = setInterval(gameLoop, 1);

        function gameLoop() {
            ctx.clearRect(0, 0, game.width, game.height);
            playerTwo.render();
            playerOne.render();
            asteroidRender();
            asteroidMove();
            collisionPlayerOne();
            collisionPlayerTwo();
            player1Moving();
            player2Moving();
            playerOneWin();
            playerTwoWin();
            playerOneWon();
            playerTwoWon();
        }
    });
//Reset button
document.querySelector('#bottom-left').addEventListener('click', function reset() {
    ctx.clearRect(0, 0, game.width, game.height);
    clearInterval(runGame);
    playerOneScore = 0;
    playerTwoScore = 0;
    document.querySelector('#score1').textContent = "";
    document.querySelector('#score2').textContent = "";
    document.querySelector('#beginning-title').classList.remove('hidden');
});

//Easter Egg lol
document.querySelector('#header').addEventListener('click', function image() {
    document.querySelector('main').classList.add('background-image');
    console.log('did it add the image?');
});


    /////Functions!

// RESET PLAYER
    function resetPlayerOne() {
        playerOne.x1 = 145;
        playerOne.y1 = 500;
        playerOne.x2 = 140;
        playerOne.y2 = 530;
        playerOne.x3 = 150;
        playerOne.y3 = 530;
    }
    function resetPlayerTwo() {
        playerTwo.x1 = 442;
        playerTwo.y1 = 500;
        playerTwo.x2 = 437;
        playerTwo.y2 = 530,
        playerTwo.x3 = 447;
        playerTwo.y3 = 530;
    }

//asteroid rendering
    function asteroidRender() {
        for (let i = 0; i < arr.length; i++) {
            arr[i].render();
        }
    }

//asteroid movement
    function asteroidMove() {
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].direction) {
                case 'r':
                    if (arr[i].x + 3 > 590) {
                        arr[i].direction = 'l'
                    } else {
                        arr[i].x += (Math.floor(Math.random() * arr[i].speed));
                    }
                    break;
                case 'l':
                    if (arr[i].x - 3 < 0) {
                        arr[i].direction = 'r'
                    } else {
                        arr[i].x -= (Math.floor(Math.random() * arr[i].speed));
                    }
                    break;
            }
        }
    }

//player movement
    function playerMovement (e) {
        if (e.key == 'w') {
            playerOne.movement = 'up';
            console.log(playerOne.movement);
        }
        if (e.key == 's') {
            playerOne.movement = 'down';
            console.log(playerOne.movement);
        }
        if (e.key == 'i') {
            playerTwo.movement = 'up';
            console.log(playerTwo.movement);
        }
        if (e.key == 'k') {
            playerTwo.movement = 'down';
            console.log(playerTwo.movement)
        }
    }
    function playerStop (e) {
        if (e.key == 'w') {
            playerOne.movement = 'stop';
            console.log(playerOne.movement);
        }
        if (e.key == 's') {
            playerOne.movement = 'stop';
            console.log(playerOne.movement);
        }
        if (e.key == 'i') {
            playerTwo.movement = 'stop';
            console.log(playerTwo.movement);
        }
        if (e.key == 'k') {
            playerTwo.movement = 'stop';
            console.log(playerTwo.movement);
        }
    }
    function player1Moving() {
        switch (playerOne.movement) {
            case 'up':
                playerOne.y1 >= 0 ? playerOne.y1 -= 1 : playerOne.y1 = 0;
                playerOne.y2 >= 30 ? playerOne.y2 -= 1 : playerOne.y2 = 30;
                playerOne.y3 >= 30 ? playerOne.y3 -= 1 : playerOne.y3 = 30;
                break;
            case 'stop':
                playerOne.y1 -= 0;
                playerOne.y2 -= 0;
                playerOne.y3 -= 0;
                break;   
            case 'down':
                playerOne.y1 <= 500 ? playerOne.y1 += 1 : playerOne.y1 = 500;
                playerOne.y2 <= 530 ? playerOne.y2 += 1 : playerOne.y2 = 530;
                playerOne.y3 <= 530 ? playerOne.y3 += 1 : playerOne.y3 = 530;
                break;
        } 
    };
    function player2Moving() {
        switch (playerTwo.movement) {
            case 'up':
                playerTwo.y1 >= 0 ? playerTwo.y1 -= 1 : playerTwo.y1 = 0;
                playerTwo.y2 >= 30 ? playerTwo.y2 -= 1 : playerTwo.y2 = 30;
                playerTwo.y3 >= 30 ? playerTwo.y3 -= 1 : playerTwo.y3 = 30;
                break;
            case 'down':
                playerTwo.y1 <= 500 ? playerTwo.y1 += 1 : playerTwo.y1 = 500;
                playerTwo.y2 <= 530 ? playerTwo.y2 += 1 : playerTwo.y2 = 530;
                playerTwo.y3 <= 530 ? playerTwo.y3 += 1 : playerTwo.y3 = 530;
                break;
            case 'stop':
                playerTwo.y1 -= 0;
                playerTwo.y2 -= 0;
                playerTwo.y3 -= 0;
                break;
        } 
    };

//Creating Asteroid
    function createAsteroid() {
        for (let i = 0; i < 20; i++) {
            let ast = new asteroid(Math.floor(Math.random() * 590), Math.floor(Math.random() * 420) + 30, 3);
            if (i % 2 === 0) {
                ast.direction = 'l'
            }
            arr.push(ast);

            // arr[i].render();
        }
    };

//Collision Functions
    function collisionPlayerOne() {
        for (let i = 0; i < arr.length; i++) {
            let hitTest = (
                playerOne.x2 < arr[i].x + 6 &&
                playerOne.x3 > arr[i].x - 6 &&
                playerOne.y1 < arr[i].y + 6 &&
                playerOne.y2 > arr[i].y - 6
            )
            if (hitTest) {
                resetPlayerOne();
            }
        } 
        return false;
    }

    function collisionPlayerTwo() {
        for (let i = 0; i < arr.length; i++) {
            let hitTest = (
                playerTwo.x2 < arr[i].x + 6 &&
                playerTwo.x3 > arr[i].x - 6 &&
                playerTwo.y1 < arr[i].y + 6 &&
                playerTwo.y2 > arr[i].y - 6
            )
            if (hitTest) {
                resetPlayerTwo();
            }
        }
        return false;
    }

  
    