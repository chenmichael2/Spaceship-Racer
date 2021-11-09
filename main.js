let game = document.querySelector('#game-canvas');
let ctx = game.getContext('2d');
window.addEventListener('load', function () {
    game.setAttribute('height' , getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
});




class plane {
    constructor(x1, y1, x2, y2, x3, y3, color) {
        this.x1 = x1; //front
        this.y1 = y1;
        this.x2 = x2;//back
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.color = color
        this.alive = true;

        this.render = function() {
            console.log(this);
            ctx.fillStyle = this.color //change the color of the context(ctx)
            var triangle1=new Path2D();
                triangle1.moveTo(this.x1, this.y1);
                triangle1.lineTo(this.x2, this.y2);
                triangle1.lineTo(this.x3, this.y3);
            ctx.fill(triangle1);
        }
    }
}


let rambo = new plane(10, 10, 10, 20, 30, 30, 'green');
rambo.render();

