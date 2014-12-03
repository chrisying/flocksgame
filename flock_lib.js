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
function Boid(position, velocity, maxspeed, type) {
  // type 0 = player, 1 = boid, 2 = hunter, 3 = dead, 4 = eating;
  this.type = type;

  // position, velocity is Paperjs Point
  this.position = position;
  this.velocity = velocity;

  // maxspeed = max dampen constant (basically max speed)
  this.maxspeed = maxspeed;

  // Paperjs path
  this.raster = null;
  this.draw = function(i) {
    // Update path in this function
    // TODO: gfx
    if (this.raster === null) {
      /*this.path = new paper.Path.Circle(
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
        case 4:
          this.path.strokeColor = 'orange';
          break;*/
      switch (this.type) {
        case 0:
          this.raster = new paper.Raster('pacman/rghostdown1.png');
          break;
        case 1:
          switch(Math.floor(Math.random() * 3)) {
            case 0:
              this.raster = new paper.Raster('pacman/bghostdown1.png');
              break;
            case 1:
              this.raster = new paper.Raster('pacman/pghostdown1.png');
              break;
            case 2:
              this.raster = new paper.Raster('pacman/yghostdown1.png');
              break;
          }
          break;
        case 2:
          this.rasters = 
          this.raster = new paper.Raster('pacman/pac1.png');
          break;
        case 3:
          this.raster = new paper.Raster('pacman/deadghost1.png');
          break;
        case 4:
          this.raster = new paper.Raster('pacman/pac2.png');
          break;
      }
      this.raster.position = this.position;
    }
    else {
      this.raster.position = this.position;
    }
  }
}
