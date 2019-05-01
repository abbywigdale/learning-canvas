$('document').ready(() => {
  //canvas set up
  let cnv = document.getElementById('myCanvas');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;

  let ctx = cnv.getContext('2d');

  // ctx.beginPath();
  // ctx.moveTo(50, 50);
  // ctx.lineTo(500, 500);
  // ctx.lineTo(200, 600);
  // ctx.stroke();

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //event listeners
  let mouse = {
    posX: undefined,
    posY: undefined,
  };
  window.addEventListener('mousemove', event => {
    mouse.posX = event.x;
    mouse.posY = event.y;
  });

  window.addEventListener('resize', () => {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
  });

  //circle class
  class Circle {
    constructor(x, y, dx, dy, radius, minRadius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = minRadius;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
    }
    update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      if (
        mouse.posX - this.x < 50 &&
        mouse.posX - this.x > -50 &&
        mouse.posY - this.y < 50 &&
        mouse.posY - this.y > -50
      ) {
        if (this.radius < 40) {
          this.radius += 8;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    }
  }

  var circleArr = [];

  for (let i = 0; i < 300; i++) {
    let radius = Math.random() * 20 + 1;
    let minRadius = Math.random() * 20 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 6;
    let dy = (Math.random() - 0.5) * 6;
    let color = getRandomColor();
    circleArr.push(new Circle(x, y, dx, dy, radius, minRadius, color));
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArr.length; i++) {
      ctx.strokeStyle = circleArr[i].color;
      ctx.fillStyle = circleArr[i].color;
      circleArr[i].update();
    }
  }

  animate();
});
