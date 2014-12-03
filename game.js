
// Constants
var FRAME_TIME = 25; // milliseconds
var HEIGHT_FULL, WIDTH_FULL;
var HEIGHT, WIDTH; // Set in index.html, do not change here
var numBoids = 50;
var numHunters = 2;

var layers;

var startScreenAssets;
var mainGameAssets;
var gameOverAssets;

var player, boids, hunters, all, score, time;

var gameState = 0;  // 0 = start screen, 1 = setup state, 2 = main game, 3 = game over

// Movement booleans
var left = false;
var right = false;
var up = false;
var down = false;

// Init
window.onload = function() {
  var canvas = document.getElementById('canvas');
  paper.setup(canvas);
  HEIGHT_FULL = canvas.height;
  WIDTH_FULL = canvas.width;
  HEIGHT = (HEIGHT_FULL * 6) / 7;
  WIDTH = WIDTH_FULL;

  paper.project.activeLayer.remove()

  layers = { startScreenLayer: new paper.Layer(),
             mainGameLayer: new paper.Layer(),
             gameOverLayer: new paper.Layer() };
 
  layers.startScreenLayer.activate();
  startScreenAssets = createStartScreenAssets();

  layers.mainGameLayer.activate();
  mainGameAssets = createMainGameAssets();

  layers.gameOverLayer.activate();
  gameOverAssets = createGameOverAssets();

  layers.startScreenLayer.activate();
  layers.mainGameLayer.remove();
  layers.gameOverLayer.remove();
}

setInterval(loop, FRAME_TIME);
document.onkeydown = handleKey;
document.onkeyup = releaseKey;

function loop() {
  switch (gameState) {
    case 0:
      startScreenLoop();
      break;
    case 1:
      setupStateLoop();
      break;
    case 2:
      mainGameLoop();
      break;
    case 3:
      gameOverLoop();
      break;
  }
}

function startScreenLoop() {
  if (paper.project.activeLayer != layers.startScreenLayer) {
    paper.project.layers.push(layers.startScreenLayer);
    paper.project.activeLayer.remove();
    layers.startScreenLayer.activate();
  }
  paper.view.draw();
}

function setupStateLoop() {
  paper.project.layers.push(layers.mainGameLayer);
  paper.project.activeLayer.remove();
  layers.mainGameLayer.activate();
  paper.project.activeLayer.removeChildren();

  paper.project.activeLayer.addChildren([
    mainGameAssets.divider,
    mainGameAssets.score,
    mainGameAssets.time,
    mainGameAssets.powerUps,
  ]);

  boids = [];
  hunters = [];
  all = [];

  // Player (boid[0] always the player)
  player = new Boid(new paper.Point(WIDTH/2, HEIGHT/2),
                    new paper.Point(0, 0),
                     0);
  boids.push(player);
  all.push(player);

  // Boids
  for (var i = 0; i < numBoids; i++) {
    var angle = Math.random() * 2 * Math.PI;
    var boid = new Boid(new paper.Point(Math.random() * WIDTH,
                                        Math.random() * HEIGHT),
                        new paper.Point(Math.cos(angle),
                                        Math.sin(angle)),
                        1);
    boids.push(boid);
    all.push(boid);
  }

  // Hunters
  for (var i = 0; i < numHunters; i++) {
    var position;

    switch (Math.floor(Math.random() * 4)) {
      case 0:
        position = new paper.Point(Math.random() * WIDTH / 3,
                                   Math.random() * HEIGHT / 3);
        break;
      case 1:
        position = new paper.Point(WIDTH * 2 / 3 + Math.random() * WIDTH / 3,
                                   Math.random() * HEIGHT / 3);
        break;
      case 2:
        position = new paper.Point(Math.random() * WIDTH / 3,
                                   HEIGHT * 2 / 3 + Math.random() * HEIGHT / 3);
        break;
      case 3:
        position = new paper.Point(WIDTH * 2 / 3 + Math.random() * WIDTH / 3,
                                   HEIGHT * 2 / 3 + Math.random() * HEIGHT / 3);
        break;
    }

    var hunter = new Boid(position,
                          new paper.Point(0, 0),
                          2);
    hunters.push(hunter);
    all.push(hunter);
  }

  score = 0;
  time = 0;

  gameState = 2;
}

// TODO: possible pickups: score, speed, slow hunter, "invisible"
function mainGameLoop() {
  // Player
  player.velocity = Pmul(player.velocity, 0.8);
  player.velocity = Padd(player.velocity, playerRule());
  player.velocity = dampen(player.velocity, 1.5);

  // Boids
  for (var i = 1; i < boids.length; i++) {
    var boid = boids[i];
    var rules = [];
    var sum_COM = calculate_COM();
    var sum_VEL = calculate_VEL();

    if (boids.length >= 2) {
      rules.push(rule1(boid, sum_COM));
      rules.push(rule2(boid));
      rules.push(rule3(boid, sum_VEL));
    }
    rules.push(rule4(boid));
    rules.push(runRule(boid));
    for (var r = 0; r < rules.length; r++) {
      boid.velocity = Padd(boid.velocity, rules[r]);
    }

    boid.velocity = dampen(boid.velocity, 1);
    boid.velocity = Padd(boid.velocity, noise());
  }

  // Hunters
  for (var i = 0; i < numHunters; i++) {
    var hunter = hunters[i];
    var rules = [];

    rules.push(huntRule(hunter));
    rules.push(rule4(hunter));
    for (var r = 0; r < rules.length; r++) {
      hunter.velocity = Padd(hunter.velocity, rules[r]);
    }

    hunter.velocity = dampen(hunter.velocity, 2);
  }

  //Score, Time
  score += changeInScore();
  time += 1;

  // Draw/update loop
  for (var i = 0; i < all.length; i++) {
    if (time % 40 === 0) {
      mainGameAssets.score.content = 'Score: ' + score.toString();
      mainGameAssets.time.content = 'Time: ' + (time / 40).toString();
    }

    boid = all[i];

    boid.position = boundary(Padd(boid.position, boid.velocity));
    // boid.position = Padd(boid.position, boid.velocity);
    boid.draw();
  }

  paper.view.draw();
}

function gameOverLoop() {
  if (paper.project.activeLayer != layers.gameOverLayer) {
    paper.project.layers.push(layers.gameOverLayer);
    paper.project.activeLayer.remove();
    layers.gameOverLayer.activate();

    gameOverAssets.score.content = 'Your score was ' + score.toString() + '.';

    gameOverAssets.time.content = 'You survived for ' + Math.floor(time / 40).toString() + ' seconds.';
  }

  paper.view.draw();
}

function handleKey(e) {
  e = e || window.event;

  switch(e.keyCode) {
    case 13:  // enter
      if (gameState === 0) {
        gameState = 1;
      }
      else if (gameState === 3) {
        gameState = 0;
      }
      break;
    case 37:  // left
      left = true;
      break;
    case 38:  // up
      up = true;
      break;
    case 39:  // right
      right = true;
      break;
    case 40:  // down
      down = true;
      break;
  }
}

function releaseKey(e) {
  e = e || window.event;

  switch(e.keyCode) {
    case 37:
      left = false;
      break;
    case 38:
      up = false;
      break;
    case 39:
      right = false;
      break;
    case 40:
      down = false;
      break;
  }
}

function playerRule() {
  var sum = new paper.Point(0, 0);
  if (left) { sum = Padd(sum, new paper.Point(-1, 0)); }
  if (right) { sum = Padd(sum, new paper.Point(1, 0)); }
  if (up) { sum = Padd(sum, new paper.Point(0, -1)); }
  if (down) { sum = Padd(sum, new paper.Point(0, 1)); }
  return Pscale(sum, 1);
}

function calculate_COM() {
  var sum = boids[0].position;
  for (var i = 1; i < boids.length; i++) {
    sum = Padd(sum, boids[i].position);
  }
  return sum;
}

function calculate_VEL() {
  var sum = boids[0].velocity;
  for (var i = 1; i < boids.length; i++) {
    sum = Padd(sum, boids[i].velocity);
  }
  return sum;
}

function dampen(vel, max) {
  // TODO: figure out how to dampen properly so that speeds balanced
  // Soft
  // if (Pabs(vel) > max) {
  //   vel = Pmul(vel, 0.9); 
  // }
 
  // Hard
  if (Pabs(vel) > 2 * max) {
    vel = Pscale(vel, 2 * max);
  }
  return vel;
}

function noise() {
  var angle = Math.random() * 2 * Math.PI;
  var base = new paper.Point(Math.cos(angle), Math.sin(angle));
  return Pdiv(base, 10);
}

function boundary(pos) {
  if (pos.x < 0) { pos.x = 0; }
  if (pos.x > WIDTH) { pos.x = WIDTH; }
  if (pos.y < 0) { pos.y = 0; }
  if (pos.y > HEIGHT) { pos.y = HEIGHT; }
  return pos;
}

// Attraction to perceived center of mass
function rule1(boid, sum_COM) {
  var per_COM = Psub(sum_COM, boid.position);
  var per_COM = Pdiv(per_COM, boids.length - 1);
  return Pdiv(Psub(per_COM, boid.position), 1000);
}

// Repulsion to nearby boids
// TODO: fix issue where boids overlap and never separate (dist = 0)
function rule2(boid) {
  var sum = new paper.Point(0, 0);
  for (var i = 0; i < boids.length; i++) {
    if (boids[i] !== boid) {
      if (Pdistsq(boids[i].position, boid.position) < 1000) {
        var displace = Psub(boids[i].position, boid.position);
        sum = Psub(sum, displace);
      }
    }
  }
  return Pdiv(sum, 100);
}

// Assimilate
function rule3(boid, sum_VEL) {
  var per_VEL = Psub(sum_VEL, boid.velocity);
  var per_VEL = Pdiv(per_VEL, boids.length - 1);
  return Pdiv(Psub(per_VEL, boid.velocity), 100);
}

// Edge avoiding
function rule4(boid) {
  var SCALE = 0.1;
  var BOUND = 25;
  var sum = new paper.Point(0, 0); 
  var mag = Pabs(boid.velocity);
  if (boid.position.x < BOUND) { sum = Padd(sum, new paper.Point(SCALE * mag, 0)); }
  if (boid.position.x > WIDTH - BOUND) { sum = Psub(sum, new paper.Point(SCALE * mag, 0)); }
  if (boid.position.y < BOUND) { sum = Padd(sum, new paper.Point(0, SCALE * mag)); }
  if (boid.position.y > HEIGHT - BOUND) { sum = Psub(sum, new paper.Point(0, SCALE * mag)); }
  return sum;
}

function runRule(boid) {
  var sum = new paper.Point(0, 0);
  for (var i = 0; i < numHunters; i++) {
    if (Pdistsq(hunters[i].position, boid.position) < 20000) {
      var displace = Psub(hunters[i].position, boid.position);
      sum = Psub(sum, displace);
    }
  }
  return Pdiv(sum, 50);
}

// Hunt closest boid
function huntRule(hunter) {
  var SCALE = 0.1;
  var minD = Pdistsq(hunter.position, boids[0].position);
  var ind = 0;
  var closest = boids[0];

  for (var i = 1; i < boids.length; i++) {
    var d = Pdistsq(hunter.position, boids[i].position);
    if (d < minD) {
      minD = d;
      ind = i;
      closest = boids[i];
    }
  }
 
  // Try to avoid orbit 
  if (minD < 10000) {
    SCALE = SCALE * 10;
  }

  // Eat
  if (minD < 500) {
    if (ind == 0) {
      console.log('Game over!');
      gameState = 3;
    }
    
    // TODO: reset hunter speed, hunt stops to "eat"
    boids.splice(ind, 1);
    closest.velocity = new paper.Point(0, 0);
    closest.type = 3;
    closest.path = null;
  }

  var vel = Psub(closest.position, hunter.position);
  return Pscale(vel, SCALE);
}

function changeInScore() {
  var change = 10 * hunters.length;

  if (boids.length > 2) {
    for (var i = 2; i < boids.length; i++) {
      change += 100 / (0.1 + Math.sqrt(Pdistsq(boids[0].position, boids[i].position)));
    }
  }

  return Math.floor(change);
}