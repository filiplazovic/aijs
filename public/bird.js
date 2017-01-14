function Bird() {
  this.y = height/2;
  this.x = 64;
  this.r = 16;
  this.gravity = 0;
  this.lift = -6;
  this.velocity = 0.3;
  this.alive = true;
}

Bird.prototype.up = function() {
    this.gravity = this.lift;
}

Bird.prototype.pass = function (pipes) {
  for(var i in pipes){
    if (this.x - this.r > pipes[i].x + pipes[i].w) {
      if (!pipes[i].passed) {
        pipes[i].passed = true;
        return true;
      }
    }
  }
}

Bird.prototype.hits = function (pipes) {
  if(this.y <= 0 || this.y >= height){
    this.alive = false;
    return true;
  }

  for(var i in pipes){
    for(var angle = 0; angle < TWO_PI; angle += 0.1){
      var x = this.x + this.r * sin(angle);
      var y = this.y + this.r * cos(angle);

      if (x > pipes[i].x && x < pipes[i].x + pipes[i].w) {
        if (y < pipes[i].top || y > height - pipes[i].bottom) {
          this.alive = false;
          return true;
        }
      }
    }
  }
}

Bird.prototype.update = function() {
  this.gravity += this.velocity;
	this.y += this.gravity;
}

Bird.prototype.show = function() {
  stroke(255);
  strokeWeight(1);
  ellipse(this.x, this.y, this.r*2, this.r*2);
}
