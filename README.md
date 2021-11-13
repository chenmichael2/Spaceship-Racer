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

## Difficulty
Radio buttons are placed for the selection of difficulty. Difficulty changes are based on the number of asteroids and the speed that the asteroids go. Easy and Slow are automatically selected and also the difficulty is already set to 20 asteroids and the speed is already set to a speed of 2px. Once each selection is made, it will change the difficulty level to 30 or 40 as well as the speed will increase to either 3 or 5. 

~~~js
document.getElementById('medium').addEventListener('click', function medium() {
    difficulty = 30;
    console.log(difficulty);
})
~~~

These changes to the number will affect how asteroids are moving and the rendering of asteroids. 

## Classes
There are two classes that are created. Asteroids and Planes (Spaceships). 

~~~js
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
~~~

These classes provide the basic framework of each plane and asteroid. The plane object is created to have keys of triangle values and the asteroid object is created to have a circular value. 

### Creation, Rendering, and Movement

### Asteroid

Asteroids are created in an array and placed with a direction depending on the where the asteroid is placed within the array. For every odd array, the asteroids movement will move to the left and all even arrays will move to the right. The amount of asteroids are placed in the for loop and will increase the number of asteroids. Asteroid movement is put into further detail in the asteroidMove() function. 

~~~js
function createAsteroid() {
        for (let i = 0; i < difficulty; i++) {
            let ast = new asteroid(Math.floor(Math.random() * 590), Math.floor(Math.random() * 420) + 30, 3);
            if (i % 2 === 0) {
                ast.direction = 'l'
            }
            arr.push(ast);
        }
    };
~~~

Once creation of asteroids and movement are done, asteroids will then be rendered and move instantly. 


### Spaceship (Blockers)

Spaceships are created with the plane class and are rendered automatically at the same x and y coordinates of each point of the triangle. The movement on the other hand was fairly tricky and I came into many blockers during this phase. Spaceship movement is created by changing all the y coordinates of each point of the spaceship. The movement needs to be tailored to the press of the movement keys stated at the beginning. The **blocker** that was created is that only one key is being able to be read when both keys are pressed at the same time. To tackle this blocker we need to figure out a way to manipulate the idea that only one key can be pressed at a time. 

The **blocker** is combatted by allowing a key read on both a key press and a key release. There are 3 different values (strings) that correspond to different movements that is also part of the object of spaceships. The three are "up", "down", and "stop". When the up key is pressed (`w` or `i`), all points of the spaceship will decrease its y coordinate value by 1 pixels and will increase when pressing the counterparts. All pixel movement of the spaceship will be halted when the keys are released. The code snippets will provide further details on what is happening to the spaceship. 

~~~js
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
~~~

## Collision

Collisions are occurred when a players area is within the area of the asteroid. Hit tests are done for each asteroid using a for loop. Once the hit test becomes true, the player will be reset by causing all points of the player to equal where they started originally. 

~~~js
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
~~~
###### if you read this far, there is an easter egg lol

## Win Condition
The win condition is detected when the score of one of the players is equal to 5. Once one of the players win, the canvas will be reset and players can either press play to play again or restart to choose another difficulty and play again. 
~~~js
    function playerOneWon() {
        if (playerOneScore === 5) {
            text.textContent = "Player One Wins"
            ctx.clearRect(0, 0, game.width, game.height);
        }
        return;
    }
~~~
