let game = document.querySelector('#game-canvas');
let ctx = game.getContext('2d');

let playerOne;
let playerTwo;

window.addEventListener('load', function () {
    game.setAttribute('height', getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
    start2Player();
});

class plane {
    constructor(x1, y1, x2, y2, x3, y3, color) {
        this.x1 = x1; //front
        this.y1 = y1;
        this.x2 = x2; //back left
        this.y2 = y2;
        this.x3 = x3; //back right
        this.y3 = y3;
        this.color = color
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
    constructor() {
        
    }
}
// 2 Player
function start2Player() {
    //creating ships
    playerOne = new plane(145, 500, 140, 530, 150, 530, 'white');
    playerOne.render();
    playerTwo = new plane(442, 500, 437, 530, 447, 530, 'gray');
    playerTwo.render();
    //movement of players
    document.addEventListener('keypress', playersMove);
    function playersMove(e) {
        console.log('movement', e.key);

        switch (e.key) {
            case 'w': //move up
                playerOne.y1 >= 0 ? playerOne.y1 -= 3 : playerOne.y1 = 0;
                playerOne.y2 >= 30 ? playerOne.y2 -= 3 : playerOne.y2 = 30;
                playerOne.y3 >= 30 ? playerOne.y3 -= 3 : playerOne.y3 = 30;
                break;
            case 's': //move down
                playerOne.y1 <= 500 ? playerOne.y1 += 3 : playerOne.y1 = 500;
                playerOne.y2 <= 530 ? playerOne.y2 += 3 : playerOne.y2 = 530;
                playerOne.y3 <= 530 ? playerOne.y3 += 3 : playerOne.y3 = 530;
                break;
            case 'i': //move up
                playerTwo.y1 >= 0 ? playerTwo.y1 -= 3 : playerTwo.y1 = 0;
                playerTwo.y2 >= 30 ? playerTwo.y2 -= 3 : playerTwo.y2 = 30;
                playerTwo.y3 >= 30 ? playerTwo.y3 -= 3 : playerTwo.y3 = 30;
                break;
            case 'k': //move down
                playerTwo.y1 <= 500 ? playerTwo.y1 += 3 : playerTwo.y1 = 500;
                playerTwo.y2 <= 530 ? playerTwo.y2 += 3 : playerTwo.y2 = 530;
                playerTwo.y3 <= 530 ? playerTwo.y3 += 3 : playerTwo.y3 = 530;
                break;
        };
    }
    // creating asteroids


    const runGame = setInterval(gameLoop, .1);
    };
    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height);
        playerOne.render();
        playerTwo.render();
    };


