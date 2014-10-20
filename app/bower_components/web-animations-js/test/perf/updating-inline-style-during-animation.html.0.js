
'use strict';

var stageWidth = 600;
var stageHeight = 600;
var particleCount = 2500;
var minVelocity = 50;
var maxVelocity = 500;
var particleRadius = 6;
var colors = ['#cc0000', '#ffcc00', '#aaff00', '#0099cc', '#194c99', '#661999'];
var animationDuration = 10;

var particles = [];
var player;
var testing = true;

var Particle = function() {
  this.element = document.createElement('div');
  this.element.className = 'ball';
  this.element.style.backgroundColor = colors[Math.floor(Perf.random() * colors.length)];
  document.body.appendChild(this.element);
};

Particle.prototype.generateAnimation = function(duration) {
  var keyframes = [];

  var angle = Math.PI * 2 * Perf.random();
  var velocity = minVelocity + ((maxVelocity - minVelocity) * Perf.random());
  var x = stageWidth / 2;
  var y = stageHeight / 2;
  var dx = Math.cos(angle) * velocity;
  var dy = Math.sin(angle) * velocity;

  var nextCollision = function(lineX, normalX, lineY, normalY) {
    var dtx = Infinity;
    var dty = Infinity;
    if (dx * normalX < 0)
      dtx = (lineX - x) / dx;
    if (dy * normalY < 0)
      dty = (lineY - y) / dy;
    var dt = Math.min(dtx, dty);
    var hitX = (dtx < dty);
    return {
      dt: dt,
      x: hitX ? lineX : x + (dx * dt),
      y: hitX ? y + (dy * dt) : lineY,
      dx: hitX ? -dx : dx,
      dy: hitX ? dy : -dy,
    };
  };

  var t = 0;
  keyframes.push(this.createKeyframe(0, x, y));
  while (t < duration) {
    var collisionA = nextCollision(0, 1, 0, 1);
    var collisionB = nextCollision(stageWidth, -1, stageHeight, -1);
    var collision = collisionA.dt < collisionB.dt ? collisionA : collisionB;
    if (t + collision.dt > duration) {
      var dt = duration - t;
      t = duration;
      x += dx * dt;
      y += dy * dt;
    } else {
      t += collision.dt;
      x = collision.x;
      y = collision.y;
      dx = collision.dx;
      dy = collision.dy;
    }
    keyframes.push(this.createKeyframe(t / duration, x, y));
  }

  return new Animation(this.element, keyframes, duration);
};

Particle.prototype.createKeyframe = function(offset, x, y) {
  return {
    composite: 'add',
    offset: offset,
    left: x + 'px',
    top: y + 'px',
  };
};

Particle.prototype.destroy = function() {
  document.body.removeChild(this.element);
};

var cleanUp = function() {
  player.source = null;
  for (var i = 0; i < particles.length; i++) {
    particles[i].destroy();
  }
  particles = [];
};

var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };

var shake = 0;
var shakeParticles = function() {
  shake = 20 - shake;
  for (var i = 0; i < particles.length; i++) {
    particles[i].element.style.setProperty('left', shake + 'px');
    particles[i].element.style.setProperty('top', shake + 'px');
  }
  if (testing) {
    raf(shakeParticles);
  }
};

window.addEventListener('load', function () {
  var spacing = document.createElement('div');
  spacing.style.display = 'inline-block';
  spacing.style.width = '600px';
  document.body.appendChild(spacing);

  var animationGroup = new AnimationGroup([], {iterations: Infinity, direction: 'alternate'});
  for (var i = 0; i < particleCount; i++) {
    var particle = new Particle();
    animationGroup.append(particle.generateAnimation(animationDuration));
    particles.push(particle);
  }
  player = document.timeline.play(animationGroup);

  raf(shakeParticles);

  Perf.oncomplete = cleanUp;
  Perf.start();
});

