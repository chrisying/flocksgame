function Padd(p1, p2) {
  return new paper.Point(p1.x + p2.x, p1.y + p2.y);
}

function Psub(p1, p2) {
  return new paper.Point(p1.x - p2.x, p1.y - p2.y);
}

function Pmul(p1, m) {
  return new paper.Point(p1.x * m, p1.y * m);
}

function Pdiv(p1, m) {
  return new paper.Point(p1.x / m, p1.y / m);
}

function Pdistsq(p1, p2) {
  var xd = p1.x - p2.x;
  var yd = p1.y - p2.y;
  return xd * xd + yd * yd;
}

function Pabs(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

function Pnorm(p) {
  return Pdiv(p, Pabs(p));
}

function Pscale(p, n) {
  return Pmul(Pnorm(p), n);
}

// Boids prototype
function Boid(position, velocity) {
  // position, velocity is Paperjs Point
  this.position = position;
  this.velocity = velocity;

  // Paperjs path
  this.path = null;
  this.draw = function() {
    // Update path in this function
    if (this.path === null) {
      this.path = new paper.Path.Circle(
          this.position,
          10);
      this.path.strokeColor = 'black';
    }
    else {
      this.path.position = this.position;
    }
  }
}
