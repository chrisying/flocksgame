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
  if (Pabs(p) < 0.001) {
    return new paper.Point(0, 0);
  } else {
    return Pdiv(p, Pabs(p));
  }
}

function Pscale(p, n) {
  return Pmul(Pnorm(p), n);
}

// Boids prototype
function Boid(position, velocity, type) {
  // type 0 = player, 1 = boid, 2 = hunter, 3 = dead
  this.type = type;

  // position, velocity is Paperjs Point
  this.position = position;
  this.velocity = velocity;

  // Paperjs path
  this.path = null;
  this.draw = function() {
    // Update path in this function
    // TODO: gfx
    if (this.path === null) {
      this.path = new paper.Path.Circle(
          this.position,
          10);
      switch (this.type) {
        case 0:
          this.path.strokeColor = 'black';
          break;
        case 1:
          this.path.strokeColor = 'green';
          break;
        case 2:
          this.path.strokeColor = 'red';
          break;
        case 3:
          this.path.strokeColor = 'purple';
          break;
      }
    }
    else {
      this.path.position = this.position;
    }
  }
}
