<<<<<<< HEAD
let canvas1;
let ctx1;

let starsCount = 1000;
let stars = [];

function SetupStarsAnimation() {
  canvas1 = document.getElementById("solarSystemBackground");
  ctx1 = canvas1.getContext("2d");

  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;

  for (var i = 0; i < starsCount; i++) {
    stars[i] = new Star(
      Math.random() * canvas1.width,
      Math.random() * canvas1.height,
      Math.random(),
      Math.random());
  }

  requestAnimationFrame(DrawStarsAnimation);
}

let backgroundColor = 1;
function DrawStarsAnimation() {
  ctx1.rect(0, 0, canvas1.width, canvas1.height);
  ctx1.fillStyle = "black";
  ctx1.fill();

  if (isStarsVisible) {
    for (var i = 0; i < starsCount; i++) {
      if (Math.random() < 0.001){
        stars[i].ResetXY();
        stars[i].Show();
      }else{
        stars[i].Update();
        stars[i].Show();
      }
    }
  }

  if (backgroundColor > 0) {
    backgroundColor -= 0.01;

    ctx1.rect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillStyle = `rgba(0,0,0,${backgroundColor})`;
    ctx1.fill();
  }
  requestAnimationFrame(DrawStarsAnimation);
}

class Star {
  constructor(px, py, s, speed) {
    this.px = px;
    this.py = py;
    this.s = s;

    this.speed = speed;
  }

  Show() {
    ctx1.fillStyle = `rgba(255, 238, 200, ${Math.sin(this.px * this.s / 2)})`;
    ctx1.beginPath();
    ctx1.ellipse(this.px, this.py, this.s + 1, this.s + 1, 0, 0, 2 * Math.PI);
    ctx1.fill();
  }

  Update() {
    this.py += this.s / 10;
    this.px += this.s / 15;

    if (this.py > canvas1.height) {
      this.py = 0;
    }
    if (this.px > canvas1.width) {
      this.px = 0;
    }
    if (this.py < 0) {
      this.py = Math.random() * canvas1.height;
    }
    if (this.px < 0) {
      this.px = Math.random() * canvas1.width;
    }
  }

  OnMouseScroll(deg) {
    this.py += deg * this.s / 2;
  }

  ResetXY() {
    this.px = Math.random() * canvas1.width;
    this.py = Math.random() * canvas1.height;
  }
}

let scroll = 0;
let isStarsVisible = true;
document.getElementsByClassName("solarSystem")[0].onscroll = function() {
  if (isStarsVisible) {
    let scrollNow = document.getElementsByClassName("solarSystem")[0].scrollTop;
    let s = scroll > scrollNow ? -10 : 10;
    scroll = scrollNow;

    for (var i = 0; i < starsCount; i++) {
      stars[i].OnMouseScroll(s);
    }
  }
}
document.getElementById("checkboxShowStars").oninput = function(){
  isStarsVisible = document.getElementById("checkboxShowStars").checked;
  if (isStarsVisible) {
    backgroundColor = 1;
  }
}

SetupStarsAnimation();
=======
let canvas1;
let ctx1;

let starsCount = 1000;
let stars = [];

function SetupStarsAnimation() {
  canvas1 = document.getElementById("solarSystemBackground");
  ctx1 = canvas1.getContext("2d");

  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;

  for (var i = 0; i < starsCount; i++) {
    stars[i] = new Star(
      Math.random() * canvas1.width,
      Math.random() * canvas1.height,
      Math.random(),
      Math.random());
  }

  requestAnimationFrame(DrawStarsAnimation);
}

let backgroundColor = 1;
function DrawStarsAnimation() {
  ctx1.rect(0, 0, canvas1.width, canvas1.height);
  ctx1.fillStyle = "black";
  ctx1.fill();

  if (isStarsVisible) {
    for (var i = 0; i < starsCount; i++) {
      if (Math.random() < 0.001){
        stars[i].ResetXY();
        stars[i].Show();
      }else{
        stars[i].Update();
        stars[i].Show();
      }
    }
  }

  if (backgroundColor > 0) {
    backgroundColor -= 0.01;

    ctx1.rect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillStyle = `rgba(0,0,0,${backgroundColor})`;
    ctx1.fill();
  }
  requestAnimationFrame(DrawStarsAnimation);
}

class Star {
  constructor(px, py, s, speed) {
    this.px = px;
    this.py = py;
    this.s = s;

    this.speed = speed;
  }

  Show() {
    ctx1.fillStyle = `rgba(255, 238, 200, ${Math.sin(this.px * this.s / 2)})`;
    ctx1.beginPath();
    ctx1.ellipse(this.px, this.py, this.s + 1, this.s + 1, 0, 0, 2 * Math.PI);
    ctx1.fill();
  }

  Update() {
    this.py += this.s / 10;
    this.px += this.s / 15;

    if (this.py > canvas1.height) {
      this.py = 0;
    }
    if (this.px > canvas1.width) {
      this.px = 0;
    }
    if (this.py < 0) {
      this.py = Math.random() * canvas1.height;
    }
    if (this.px < 0) {
      this.px = Math.random() * canvas1.width;
    }
  }

  OnMouseScroll(deg) {
    this.py += deg * this.s / 2;
  }

  ResetXY() {
    this.px = Math.random() * canvas1.width;
    this.py = Math.random() * canvas1.height;
  }
}

let scroll = 0;
let isStarsVisible = true;
document.getElementsByClassName("solarSystem")[0].onscroll = function() {
  if (isStarsVisible) {
    let scrollNow = document.getElementsByClassName("solarSystem")[0].scrollTop;
    let s = scroll > scrollNow ? -10 : 10;
    scroll = scrollNow;

    for (var i = 0; i < starsCount; i++) {
      stars[i].OnMouseScroll(s);
    }
  }
}
document.getElementById("checkboxShowStars").oninput = function(){
  isStarsVisible = document.getElementById("checkboxShowStars").checked;
  if (isStarsVisible) {
    backgroundColor = 1;
  }
}

SetupStarsAnimation();
>>>>>>> e58259585391169bc8b75b54137f0c46befcb964
