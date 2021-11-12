# Spaceship Racer

## Overview
Spaceship Racer is my first ever creation using code. It is a two player game where two spaceships have to reach the other side to save Earth. But, there are asteroids in the way and it takes 5 different timelines to realize the true reality to save Earth. 

### How to Play
After choosing the difficulty levels, Press `play`. Player one uses the keys `w` and `s` to move up and down respectively and Player two uses the keys `i` and `k` to move up and down respectively as well. A player is reset everytime an asteroid hits the player and first player to 5 wins. If you want to choose a different difficulty level, press the `restart` button. If you want to keep playing press `play` again. 

## Wireframe vs. Game
### Wireframe
The picture below presents the beginning structure of how I wanted to create the game. It consists of having its own console and providing the title at the top and from top to bottom on both the right side, the player controls, the player's score, and the buttons, respectively. Player one's stats will be on the left while player two's stats on the right. The canvas is place directly in the center. (don't mind the incorrect title, I thought it was going to be that at the beginning of the project).

![Wireframe](/wireframe.png)

### Grid Layout
A grid layout is used to provide the different areas for where everything is going to be placed and provide the correct sizing as well. 

![Grid](/grid.png)

### Game layout
The game finally looks like this. (Styling still in progress).

![Game](/game.png)

# How it Works

## Classes
There are two classes that are created. Asteroids and Planes (Spaceships). 
```
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
```

```
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
```
These classes provide the basic framework of each plane and asteroid. The plane object is created to have keys of triangle values and the asteroid object is created to have a circular value. 

### Creation, Rendering, and Movement

#### Asteroid

#### Spaceship

## Collision

## Win Condition

## Difficulty