let game = document.querySelector('#game-canvas');
let ctx = game.getContext('2d');

game.setAttribute('height' , getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);

class plane {
    constructor(x1, y1, x2, y2, color) {
        this.x1 = x1; //front
        this.y1 = y1;
        this.x2 = x2;//back
        this.y2 = y2;
        this.color = color
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color //change the color of the context(ctx)
            ctx.fillRect(this.x1, this.y1, this.x2, this.y2);
        }
    }
}

let rambo = new plane(10, 10, 20, 20, 'green');
rambo.render();