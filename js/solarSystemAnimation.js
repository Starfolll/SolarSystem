let canvas2;
let ctx2;

let Sun;
let Jupiter;
let Mars;
let Mercury;
let Neptune;
let Saturn;
let Earth;
let Uranus;
let Venus;

let Orbits = [];
let Asteroids = [];

function SetupAnimationSolarSystem() {
  canvas2 = document.getElementById("solarSystemCanvas");
  ctx2 = canvas2.getContext("2d");

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  RangeCanvasZoom = document.getElementById("rangeCanvasZoom");
  CheckboxShowNames = document.getElementById("checkboxShowNames")

  InitializeBodys();
  InitializeOrbits();

  for (var i = 0; i < 100; i++) {
    let offX = (Math.random() - 0.5) * 2;
    let offY = (Math.random() - 0.5) * 2;
    let radius = Math.sqrt((offX * offX) + (offY * offY));
    Asteroids[i] = new Asteroid(offX/radius * (Math.random() * 3 + 2), offY/radius * (Math.random() * 3 + 2), Math.random() * 10 + 5);
  }

  document.getElementById("rangeCanvasZoom").oninput();

  requestAnimationFrame(UpdateAnimationSolarSystem);
}

function InitializeOrbits() {
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(57910006) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(108199995) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(149599951) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(227939920) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(778330257) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(1429400028) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(2870989228) * window.innerHeight));
  Orbits.push(new Orbit(SolarSystemGetPercentPosition(4504299579) * window.innerHeight));
}
function InitializeBodys() {
  Sun = new CosmicBody("img_sun", "Sun", 75);
  Jupiter = new CosmicBody("img_jupiter", "Jupiter", 50);
  Mars = new CosmicBody("img_mars", "Mars", 20);
  Mercury = new CosmicBody("img_mercury", "Mercury", 15);
  Neptune = new CosmicBody("img_neptune", "Neptune", 35);
  Saturn = new CosmicBody("img_saturn", "Saturn", 47);
  Earth = new CosmicBody("img_earth", "Earth", 30);
  Uranus = new CosmicBody("img_uranus", "Uranus", 37);
  Venus = new CosmicBody("img_venus", "Venus", 28);
}

function UpdateAnimationSolarSystem() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  for (var i = 0; i < Asteroids.length; i++) {
    Asteroids[i].Show();
  }

  ShowOrbits();
  ShowCosmicBodys();
  ShowBodyNames();

  requestAnimationFrame(UpdateAnimationSolarSystem);
}

let isShowNames = false;
function ShowOrbits() {
  for (var i = 0; i < Orbits.length; i++) {
    Orbits[i].Show();
  }
}
function ShowCosmicBodys() {
  let midW = canvas2.width / 2;
  let midH = canvas2.height / 2;
  Sun.Show(midW, midH);

  let date = new Date() / 1000;
  let mercuryOffX = GetPlanetOffsetX(0);
  Mercury.Show(
    midW + Math.sin(date) * mercuryOffX,
    midH + Math.cos(date) * mercuryOffX);

  let venusOffX = GetPlanetOffsetX(1);
  Venus.Show(
    midW + venusOffX,
    midH);

  let earthOffX = GetPlanetOffsetX(2);
  Earth.Show(
    midW + earthOffX,
    midH);

  let marsOffX = GetPlanetOffsetX(3);
  Mars.Show(
    midW + marsOffX,
    midH);

  let jupiterOffX = GetPlanetOffsetX(4);
  Jupiter.Show(
    midW + jupiterOffX,
    midH);

  let saturnOffX = GetPlanetOffsetX(5);
  Saturn.Show(
    midW + saturnOffX,
    midH);

  let uranusOffX = GetPlanetOffsetX(6);
  Uranus.Show(
    midW + uranusOffX,
    midH);

  let neptuneOffX = GetPlanetOffsetX(7);
  Neptune.Show(
    midW + neptuneOffX,
    midH);
}
function GetPlanetOffsetX(orbitId) {
  return Orbits[orbitId].size * Orbits[orbitId].scale / 4;
}
function ShowBodyNames() {
  if (isShowNames) {
    Sun.ShowName();
    Jupiter.ShowName();
    Mars.ShowName();
    Mercury.ShowName();
    Neptune.ShowName();
    Saturn.ShowName();
    Earth.ShowName();
    Uranus.ShowName();
    Venus.ShowName();
  }
}

class CosmicBody {
  constructor(image, name, s) {
    this.name = name;
    this.image = document.getElementById(image);
    this.s = s;
    this.scale = 1;
  }

  Show(px, py) {
    this.px = px;
    this.py = py;
    let addedSize = 15;
    ctx2.drawImage(
      this.image,
      px - this.s / 2 * this.scale - addedSize / 2, // midW + Math.sin(date) * mercuryOffX
      py - this.s / 2 * this.scale - addedSize / 2,
      this.s * this.scale + addedSize,
      this.s * this.scale + addedSize);
  }

  ShowName() {
    ctx2.font = "24px Raleway sans-serif";
    ctx2.fillStyle = "white";
    ctx2.fillText(this.name, this.px, this.py + 8);
  }
}
class Orbit {
  constructor(size) {
    this.size = size;
    this.scale = 0.1;
  }

  Show() {
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    ctx2.ellipse(
      canvas2.width / 2,
      canvas2.height / 2,
      this.size / 4 * this.scale,
      this.size / 4 * this.scale,
      0,
      0,
      2 * Math.PI);
    ctx2.stroke();
  }
}
class Asteroid {
  constructor(px, py, size) {
    this.px = px;
    this.py = py;
    this.size = size;
    this.scale = 1;
    this.orbitId = 2;
    this.image = document.getElementById(`img_asteroid_${(Math.random() * 3 + 2) | 0}`);
  }

  Show() {
    let addpx = GetPlanetOffsetX(this.orbitId);
    ctx2.drawImage(
      this.image,
      canvas2.width / 2 - this.px * addpx - this.scale / 2 * this.scale,
      canvas2.height / 2 - this.py * addpx - this.scale / 2 * this.scale,
      this.size/1.3 * this.scale,
      this.size/1.3 * this.scale);
  }
}

function SolarSystemGetPercentPosition(num) {
  return (num - 57910006) * (100 - 1) / (4504299579 - 57910006) + 1;
}

let RangeCanvasZoom;
let CheckboxShowNames;
document.getElementById("rangeCanvasZoom").oninput = function() {
  let rangeVal = RangeCanvasZoom.value;

  for (var i = 0; i < Orbits.length; i++) {
    Orbits[i].scale = rangeVal;
  }
  Sun.scale = rangeVal;
  Jupiter.scale = rangeVal;
  Mars.scale = rangeVal;
  Mercury.scale = rangeVal;
  Neptune.scale = rangeVal;
  Saturn.scale = rangeVal;
  Earth.scale = rangeVal;
  Uranus.scale = rangeVal;
  Venus.scale = rangeVal;
  Asteroids.scale = rangeVal;
}
document.getElementById("checkboxShowNames").oninput = function() {
  isShowNames = CheckboxShowNames.checked;
}

SetupAnimationSolarSystem();
