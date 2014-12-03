function createStartScreenAssets() {
  var startScreenAssets = {};

  startScreenAssets.title = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 3],
      justification: 'center',
      fillColor: 'black',
      fontSize: 100,
      content: 'Flocks'
    });

  startScreenAssets.start = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 2 / 3],
      justification: 'center',
      fillColor: 'black',
      fontSize: 50,
      content: 'Press enter to play.'
    });

  return startScreenAssets;
}

function createMainGameAssets() {
  var mainGameAssets = {};

  mainGameAssets.divider = new paper.Path.Line(
    { from: [0, HEIGHT + 15],
      to: [WIDTH_FULL, HEIGHT + 15],
      strokeColor: 'black'
    });

  mainGameAssets.score = new paper.PointText(
    { point: [WIDTH_FULL / 4, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'center',
      fillColor: 'black',
      fontSize: 25,
      content: 'Score: 0'
    });

  mainGameAssets.time = new paper.PointText(
    { point: [WIDTH_FULL / 2, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'center',
      fillColor: 'black',
      fontSize: 25,
      content: 'Time: 0'
    });

  mainGameAssets.powerUps = new paper.PointText(
    { point: [WIDTH_FULL * 3 / 4, (HEIGHT + HEIGHT_FULL) / 2 + 10],
      justification: 'center',
      fillColor: 'black',
      fontSize: 25,
      content: 'Power ups: None'
    });

  return mainGameAssets;
}

function createGameOverAssets() {
  var gameOverAssets = {};

  gameOverAssets.message = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 3],
      justification: 'center',
      fillColor: 'black',
      fontSize: 100,
      content: 'Game Over!'
    });

  gameOverAssets.score = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL / 2],
      justification: 'center',
      fillColor: 'black',
      fontSize: 50,
      content: 'Your score was 0.'
    });

  gameOverAssets.time = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 7 / 12],
      justification: 'center',
      fillColor: 'black',
      fontSize: 50,
      content: 'You survived for 0 seconds.'
    });

  gameOverAssets.start = new paper.PointText(
    { point: [WIDTH_FULL / 2, HEIGHT_FULL * 2 / 3],
      justification: 'center',
      fillColor: 'black',
      fontSize: 36,
      content: 'Press enter to go to the start screen.'
    });

  return gameOverAssets;
}