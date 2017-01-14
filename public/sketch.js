var birds;
var pipes;

var ne;
var gen = [];
var score = 0;
var generation = 0;

var score = 0;
function setup() {
  createCanvas(400, 600);

  ne = new Neuroevolution({
			population:50,
			network:[2, [2], 1],
		});
  start();

  pipes.push(new Pipe());
}

function draw() {
  background(0);
  text("Score: " + score, 10, 10);
  text("Generation: " + generation, 10, 25);
  text("Alive: " + getAlives(), 10, 40);
  score++;
  updateBirds();
  updatePipes();
}

function updateBirds() {
  var nextHoll = 0;

  for(var i = 0; i < pipes.length; i++){
    if (!pipes[i].passed) {
      nextHoll = height - pipes[i].bottom;
      break;
    }
  }
  text("next: " + nextHoll, 10, 70);

  for(var i in birds){
    if (birds[i].alive) {
      birds[i].update();

      var inputs = [
        birds[i].y,
        nextHoll
      ]

      var res = gen[i].compute(inputs);
      if (res > 0.5) {
        birds[i].up();
      }

      if (birds[i].hits(pipes)) {
        ne.networkScore(gen[i], score);
        if (isGameOver()) {
          start();
          break;
        }
      }

      if (birds[i].pass(pipes)) {}

      birds[i].show();
    }
  }
}

function updatePipes() {
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  if (frameCount % 90 == 0) {
    pipes.push(new Pipe());
  }
}

function start() {
  score = 0;
  pipes = [];
  birds = [];

  gen = ne.nextGeneration();
  for(var i in gen){
    var b = new Bird();
    birds.push(b);
  }
  generation++;
}

function isGameOver() {
  for(var i in birds){
		if(birds[i].alive){
			return false;
		}
	}
	return true;
}

function getAlives() {
  var alives = 0;
  for(var i = 0; i < birds.length; i++){
    if (birds[i].alive) {
      alives++;
    }
  }
  return alives;
}
