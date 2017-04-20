function Pipe() {
  var spacing = 150;
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2);

  this.x = width;
  this.w = 20;
  this.speed = 2;
  this.passed = false;
  this.highlight = false;
}
Pipe.prototype.show = function() {
  fill(255);
  rect(this.x, 0, this.w, this.top);
  rect(this.x, height-this.bottom, this.w, this.bottom);
}

Pipe.prototype.update = function() {
  this.x -= this.speed;
}

Pipe.prototype.offscreen = function() {
  if (this.x < -this.w) {
    return true;
  } else {
    return false;
  }
}
