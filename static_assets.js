function createStartScreenAssets() {
  var startScreenAssets = {};

  startScreenAssets.background = new paper.Path.Rectangle(
    { from: [0, 0],
      to: [WIDTH_FULL, HEIGHT_FULL],
      strokeColor: 'black',
      fillColor: 'black'
    });

  startScreenAssets.title1 = new paper.Raster(
    { source: 'pacman/title1.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 3)
    });
  startScreenAssets.title1.visible = false;
  startScreenAssets.title1.scale(1.5);

  startScreenAssets.title2 = new paper.Raster(
    { source: 'pacman/title2.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 3)
    });
  startScreenAssets.title2.visible = false;
  startScreenAssets.title2.scale(1.5);

  startScreenAssets.title3 = new paper.Raster(
    { source: 'pacman/title3.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 3)
    });
  startScreenAssets.title3.visible = false;
  startScreenAssets.title3.scale(1.5);

  startScreenAssets.start = new paper.Raster(
    { source: 'pacman/start.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL * 2 / 3)
    });

  startScreenAssets.instruction1 = new paper.Raster(
    { source: 'pacman/rules1.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 2)
    });
  startScreenAssets.instruction1.visible = false;
  startScreenAssets.instruction1.scale(1.5);

  startScreenAssets.instruction2 = new paper.Raster(
    { source: 'pacman/rules2.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 2)
    });
  startScreenAssets.instruction2.visible = false;
  startScreenAssets.instruction2.scale(1.5);

  return startScreenAssets;
}

function createMainGameAssets() {
  var mainGameAssets = {};

  mainGameAssets.background = new paper.Path.Rectangle(
    { from: [0, 0],
      to: [WIDTH, HEIGHT + 10],
      strokeColor: 'black',
      fillColor: 'black'
    });

  /*mainGameAssets.divider = new paper.Path.Line(
    { from: [0, HEIGHT + 10],
      to: [WIDTH_FULL, HEIGHT + 10],
      strokeColor: 'black'
    });*/

  mainGameAssets.border1 = new paper.Path.Rectangle(
    { from: [10, HEIGHT + 10],
      to: [WIDTH - 10, HEIGHT_FULL],
      strokeColor: 'white',
      strokeWidth: 5
    });

  mainGameAssets.border2 = new paper.Path.Rectangle(
    { from: [0, HEIGHT + 20],
      to: [WIDTH, HEIGHT_FULL - 10],
      strokeColor: 'white',
      strokeWidth: 5
    });

  mainGameAssets.score = new paper.PointText(
    { point: [WIDTH_FULL * 1 / 32, (HEIGHT * 2 + HEIGHT_FULL) / 3 + 10],
      justification: 'left',
      fillColor: 'white',
      fontSize: 20,
      content: 'Score: 0'
    });

  mainGameAssets.time = new paper.PointText(
    { point: [WIDTH_FULL * 1 / 32, (HEIGHT + HEIGHT_FULL * 2) / 3 + 10],
      justification: 'left',
      fillColor: 'white',
      fontSize: 20,
      content: 'Time: 0'
    });

  mainGameAssets.sprint = new paper.PointText(
    { point: [WIDTH_FULL * 3 / 16, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'left',
      fillColor: 'white',
      fontSize: 20,
      content: 'Sprint: '
    });

  mainGameAssets.sprintBarContainer = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 1 / 4, (HEIGHT + HEIGHT_FULL) / 2 - 15],
    to: [WIDTH_FULL * 5 / 8, (HEIGHT + HEIGHT_FULL) / 2 + 25],
    strokeColor: 'white'
  });

  mainGameAssets.sprintBar = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 1 / 4, (HEIGHT + HEIGHT_FULL) / 2 - 15],
    to: [WIDTH_FULL * 5 / 8, (HEIGHT + HEIGHT_FULL) / 2 + 25],
    fillColor: new paper.Color(0, 0, 255),
    strokeColor: 'white'
  });

  mainGameAssets.powerUps = new paper.PointText(
    { point: [WIDTH_FULL * 21 / 32, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'left',
      fillColor: 'white',
      fontSize: 20,
      content: 'Power ups: '
    });

  mainGameAssets.powerUpsBox1 = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 25 / 32, (HEIGHT + HEIGHT_FULL) / 2 - 30],
    to: [WIDTH_FULL * 27 / 32, (HEIGHT + HEIGHT_FULL) / 2 + 40],
    strokeColor: 'white'
  });

  mainGameAssets.powerUpsBox2 = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 7 / 8, (HEIGHT + HEIGHT_FULL) / 2 - 30],
    to: [WIDTH_FULL * 15 / 16, (HEIGHT + HEIGHT_FULL) / 2 + 40],
    strokeColor: 'white'
  });

  return mainGameAssets;
}

function createGameOverAssets() {
  var gameOverAssets = {};

  gameOverAssets.background = new paper.Path.Rectangle(
    { from: [0, 0],
      to: [WIDTH_FULL, HEIGHT_FULL],
      strokeColor: 'black',
      fillColor: 'black'
    });

  gameOverAssets.message = new paper.Raster(
    { source: 'pacman/gameOver.png',
      position: new paper.Point(WIDTH_FULL / 2, HEIGHT_FULL / 3)
    });

  gameOverAssets.score = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 2],
      justification: 'center',
      fillColor: 'white',
      fontSize: 50,
      content: 'Your score was 0.'
    });

  gameOverAssets.time = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 7 / 12],
      justification: 'center',
      fillColor: 'white',
      fontSize: 50,
      content: 'You survived for 0 seconds.'
    });

  gameOverAssets.start = new paper.Raster(
    { source: 'pacman/gameOverStart.png',
      position: new paper.Point(WIDTH_FULL / 2 + 10, HEIGHT_FULL * 2 / 3)
    });

  return gameOverAssets;
}

function powerUp(position, type) {
  this.type = type;
  this.position = position;

  switch (this.type) {
    case 0:
      this.raster = new paper.Raster('pacman/cherry.png');
      this.raster.position = this.position;
      break
  }
}