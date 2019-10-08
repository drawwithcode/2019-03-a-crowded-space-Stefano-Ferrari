var myStars = [];
var myMeteors = [];
var spaceship;
var score;
var gameOver = 0;

function preload() {
  spaceship = loadImage('spaceship.png');
  meteorite = loadImage('meteorite.png');
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //Fill the stars' array
  for (var i = 0; i < 500; i++) {
    var starInSpace = new Star();
    myStars.push(starInSpace);
  }
}

function draw() {
  background(20, 60, 100);

  //Draw the stars
  for (var i = 0; i < myStars.length; i++) {
    var s = myStars[i];
    s.move();
    s.display();
  }

  //sprite for the cursor
  image(spaceship, mouseX - 40, mouseY - 40, 80, 80);

  //until "game over" is == 0 the game keeps running
  if (gameOver == 0) {
    //meteor spawn randomly
    if (random(10) > 8.88) {
      var meteorFired = new Meteor();
      myMeteors.push(meteorFired);
    }

    for (var j = 0; j < myMeteors.length; j++) {
      var m = myMeteors[j];
      m.move();
      m.display();
      m.check();
    }

    score = Math.floor(frameCount / 15);

    fill('white');
    textFont('Minecraft');
    textSize(50);
    text(score, 20, 50);
  } else {
    //Game over screen
    fill('white');
    textFont('Minecraft');
    textAlign(CENTER);
    textSize(50);
    text('Your Score is ' + score, windowWidth / 2, windowHeight / 4);
    textSize(100);
    text('Game Over', windowWidth / 2, windowHeight / 2);
    textSize(30);
    text('Click anywhere to restart', windowWidth / 2, windowHeight / 1.2);

    if (mouseIsPressed) {
      location.reload();
    }
  }



}

function Star() {

  this.x = random(windowWidth);
  this.y = random(-5 * windowHeight, windowHeight);
  this.diameter = random(4);

  this.move = function() {
    this.y += 0.3;
  }

  this.display = function() {
    fill('white');
    ellipse(this.x, this.y, this.diameter);
  }
}

function Meteor() {
  this.x = random(windowWidth);
  this.y = -500;
  this.diameter = random(20, 100);
  this.speedY = random(3, 9);

  //chance that the meteor change direction
  if (random(5) > 4) {
    this.speedX = random(-2, 2);
  } else {
    this.speedX = 0;
  }

  this.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  //check if the ship and the meteor collide
  this.check = function() {
    var distance = sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2));
    if (distance < (30) + (this.diameter) / 2) {
      gameOver++;
    }
  }

  this.display = function() {
    image(meteorite, this.x - (this.diameter) / 2, this.y - (this.diameter) / 2, this.diameter, this.diameter);
  }
}
