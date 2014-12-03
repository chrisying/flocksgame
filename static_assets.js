function createStartScreenAssets() {
  var startScreenAssets = {};

  startScreenAssets.background = new paper.Path.Rectangle(
    { from: [0, 0],
      to: [WIDTH_FULL, HEIGHT_FULL],
      strokeColor: 'black',
      fillColor: 'black'
    });

  startScreenAssets.title = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 3],
      justification: 'center',
      fillColor: 'white',
      fontSize: 100,
      content: 'Flocks'
    });

  startScreenAssets.start = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 2 / 3],
      justification: 'center',
      fillColor: 'white',
      fontSize: 50,
      content: 'Press enter to play.'
    });

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

  mainGameAssets.divider = new paper.Path.Line(
    { from: [0, HEIGHT + 10],
      to: [WIDTH_FULL, HEIGHT + 10],
      strokeColor: 'black'
    });

  mainGameAssets.score = new paper.PointText(
    { point: [WIDTH_FULL * 1 / 32, (HEIGHT * 2 + HEIGHT_FULL) / 3 + 10],
      justification: 'left',
      fillColor: 'black',
      fontSize: 20,
      content: 'Score: 0'
    });

  mainGameAssets.time = new paper.PointText(
    { point: [WIDTH_FULL * 1 / 32, (HEIGHT + HEIGHT_FULL * 2) / 3 + 10],
      justification: 'left',
      fillColor: 'black',
      fontSize: 20,
      content: 'Time: 0'
    });

  mainGameAssets.sprint = new paper.PointText(
    { point: [WIDTH_FULL * 1 / 4, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'left',
      fillColor: 'black',
      fontSize: 25,
      content: 'Sprint: '
    });

  mainGameAssets.sprintBarContainer = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 3 / 8, (HEIGHT + HEIGHT_FULL) / 2 - 15],
    to: [WIDTH_FULL * 3 / 4, (HEIGHT + HEIGHT_FULL) / 2 + 25],
    strokeColor: 'black'
  });

  mainGameAssets.sprintBar = new paper.Path.Rectangle({
    from: [WIDTH_FULL * 3 / 8, (HEIGHT + HEIGHT_FULL) / 2 - 15],
    to: [WIDTH_FULL * 1 / 2, (HEIGHT + HEIGHT_FULL) / 2 + 25],
    fillColor: new paper.Color(0, 0, 255),
    strokeColor: 'black'
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

  gameOverAssets.message = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 3],
      justification: 'center',
      fillColor: 'white',
      fontSize: 100,
      content: 'Game Over!'
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

  gameOverAssets.start = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 2 / 3],
      justification: 'center',
      fillColor: 'white',
      fontSize: 36,
      content: 'Press enter to go to the start screen.'
    });

  return gameOverAssets;
}