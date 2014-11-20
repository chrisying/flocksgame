
// Constants
var FRAME_TIME = 50; // milliseconds
var HEIGHT, WIDTH; // Set in index.html, do not change here
var numBoids = 20;
var boids;

// Init
window.onload = function() {
  var canvas = document.getElementById('canvas');
  paper.setup(canvas);
  HEIGHT = canvas.height;
  WIDTH = canvas.width;

  boids = [];
  for (var i = 0; i < numBoids; i++) {
    var angle = Math.random() * 2 * Math.PI;
    var boid = new Boid(new paper.Point(Math.random() * WIDTH,
                                        Math.random() * HEIGHT),
                        new paper.Point(Math.cos(angle),
                                        Math.sin(angle)));
    boids.push(boid);
  }
}

setInterval(loop, FRAME_TIME);

function loop() {
  for (var i = 0; i < numBoids; i++) {
    var boid = boids[i];
    var rules = [];
    var sum_COM = calculate_COM();
    var sum_VEL = calculate_VEL();

    rules.push(rule1(boid, sum_COM));
    rules.push(rule2(boid));
    rules.push(rule3(boid, sum_VEL));
    rules.push(rule4(boid));
    for (var r = 0; r < rules.length; r++) {
      boid.velocity = Padd(boid.velocity, rules[r]);
    }

    boid.velocity = dampen(boid.velocity);
    boid.velocity = Padd(boid.velocity, noise());
    // boid.position = boundary(Padd(boid.position, boid.velocity));
    boid.position = Padd(boid.position, boid.velocity);
    boid.draw();
  }
  paper.view.draw();
}

function calculate_COM() {
  var sum = boids[0].position;
  for (var i = 1; i < numBoids; i++) {
    sum = Padd(sum, boids[i].position);
  }
  return sum;
}

function calculate_VEL() {
  var sum = boids[0].velocity;
  for (var i = 1; i < numBoids; i++) {
    sum = Padd(sum, boids[i].velocity);
  }
  return sum;
}

function dampen(vel) {
  if (Pabs(vel) > 10) {
    vel = Pmul(vel, 0.85); 
  }
  return vel;
}

function noise() {
  return new paper.Point(Math.cos(Math.random() * 2 * Math.PI), Math.sin(Math.random() * 2 * Math.PI));
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
  var per_COM = Pdiv(per_COM, numBoids - 1);
  return Pdiv(Psub(per_COM, boid.position), 100);
}

// Repulsion to nearby boids
function rule2(boid) {
  var sum = new paper.Point(0, 0);
  for (var i = 0; i < numBoids; i++) {
    if (boids[i] !== boid) {
      if (Pdistsq(boids[i].position, boid.position) < 5000) {
        var displace = Psub(boids[i].position, boid.position);
        if (Math.abs(displace.x) < 2) { displace.x += Math.sign(displace.x) * 1; }
        if (Math.abs(displace.y) < 2) { displace.y += Math.sign(displace.y) * 1; }
        displace.x = 1 / displace.x;
        displace.y = 1 / displace.y;
        sum = Psub(sum, displace);
      }
    }
  }
  return Pmul(sum, 10);
}

// Assimilate
function rule3(boid, sum_VEL) {
  var per_VEL = Psub(sum_VEL, boid.velocity);
  var per_VEL = Pdiv(per_VEL, numBoids - 1);
  return Pdiv(Psub(per_VEL, boid.velocity), 1);
}

// Edge avoiding
function rule4(boid) {
  var sum = new paper.Point(0, 0);
  if (boid.position.x < 50) { sum = Padd(sum, new paper.Point(3, 0)); }
  if (boid.position.x > WIDTH - 50) { sum = Padd(sum, new paper.Point(-3, 0)); }
  if (boid.position.y < 50) { sum = Padd(sum, new paper.Point(0, 3)); }
  if (boid.position.y > HEIGHT - 50) { sum = Padd(sum, new paper.Point(0, -3)); }
  return sum;
}
