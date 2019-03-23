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

function SetupAnimationSolarSystem(){
  canvas2 = document.getElementById("solarSystemCanvas");
  ctx2 = canvas2.getContext("2d");

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  InitializeBodys();
  InitializeOrbits();

  requestAnimationFrame(UpdateAnimationSolarSystem);
}

function InitializeOrbits(){
  Orbits.push(new Orbit(300));
  Orbits.push(new Orbit(100));
  Orbits.push(new Orbit(130));
}
function InitializeBodys(){
  Sun = new CosmicBody("img_sun", 75);
  Jupiter = new CosmicBody("img_jupiter", 50);
  Mars = new CosmicBody("img_mars", 20);
  Mercury = new CosmicBody("img_mercury", 15);
  Neptune = new CosmicBody("img_neptune", 35);
  Saturn = new CosmicBody("img_saturn", 47);
  Earth = new CosmicBody("img_earth", 30);
  Uranus = new CosmicBody("img_uranus", 37);
  Venus = new CosmicBody("img_venus", 28);
}

function UpdateAnimationSolarSystem(){
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ShowOrbits();
  ShowCosmicBodys()

  requestAnimationFrame(UpdateAnimationSolarSystem);
}

function ShowOrbits(){
  for (var i = 0; i < Orbits.length; i++) {
    Orbits[i].Show();
  }
}
function ShowCosmicBodys(){
  Sun.Show(canvas2.width/2, canvas2.height/2);
  Jupiter.Show(canvas2.width/2 + 100, canvas2.height/2);
  Mars.Show(canvas2.width/2 - 100, canvas2.height/2);
  Mercury.Show(canvas2.width/2 + 200, canvas2.height/2);
  Neptune.Show(canvas2.width/2 - 200, canvas2.height/2);
  Saturn.Show(canvas2.width/2 + 300, canvas2.height/2);
  Earth.Show(canvas2.width/2 - 300, canvas2.height/2);
  Uranus.Show(canvas2.width/2 + 400, canvas2.height/2);
  Venus.Show(canvas2.width/2 - 400, canvas2.height/2);
}

class CosmicBody{
  constructor(image, s){
    this.image = document.getElementById(image);
    this.s = s;
  }

  Show(px, py){
    ctx2.drawImage(this.image, px-this.s/2, py-this.s/2, this.s, this.s);
  }
}

class Orbit{
  constructor(size){
    this.size = size;
  }

  Show(){
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    ctx2.ellipse(canvas2.width/2, canvas2.height/2, this.size, this.size / 2, 0, 0, 2 * Math.PI);
    ctx2.stroke();
  }
}

SetupAnimationSolarSystem();
