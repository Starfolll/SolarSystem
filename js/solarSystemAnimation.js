let canvas2;
let ctx2;

let Sun;
let Jupiter;
let Mars;
let Moon;
let Mercury;
let Neptune;
let Saturn;
let Earth;
let Uranus;
let Venus;

let showName = true;
let zoomLevel = 50;
let centerX = 0;
let centerY = 0;
let pointPlanet = "sun";
let dateOff = 0;

function SetupAnimationSolarSystem() {
  canvas2 = document.getElementById("solarSystemCanvas");
  ctx2 = canvas2.getContext("2d");

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  ctx2.font = "32px Arial";
  ctx2.textAlign = "center";
  ctx2.fillStyle = "black";
  ctx2.strokeStyle = "white";
  ctx2.lineWidth = 3;

  // centerX = canvas2.width/2;
  // centerY = canvas2.height/2;

  InitializeBodys();
  InitializeActions();
  InitializeTargetPlanets();

  requestAnimationFrame(UpdateAnimationSolarSystem);
}
function SolarSystemGetPercentPosition(num) {
  return (num - 57910006) * (100 - 1) / (4504299579 - 57910006) + 1;
}
function InitializeBodys() {
  Sun = new CosmicBody("img_sun", "Sun", 75);
  Mercury = new CosmicBody("img_mercury", "Mercury", 50, SolarSystemGetPercentPosition(57910006));
  Venus = new CosmicBody("img_venus", "Venus", 50, SolarSystemGetPercentPosition(108199995));
  Earth = new CosmicBody("img_earth", "Earth", 50, SolarSystemGetPercentPosition(149599951));
  Mars = new CosmicBody("img_mars", "Mars", 50, SolarSystemGetPercentPosition(227939920));
  Jupiter = new CosmicBody("img_jupiter", "Jupiter", 50, SolarSystemGetPercentPosition(778330257));
  Saturn = new CosmicBody("img_saturn", "Saturn", 50, SolarSystemGetPercentPosition(1429400028));
  Uranus = new CosmicBody("img_uranus", "Uranus", 50, SolarSystemGetPercentPosition(2870989228));
  Neptune = new CosmicBody("img_neptune", "Neptune", 50, SolarSystemGetPercentPosition(4504299579));
}
function InitializeActions(){
  let zoom = document.getElementById("getScroll");
  zoom.onwheel = function onWheel(e) {
    var delta = e.deltaY;

    let addzoom = zoomLevel + delta/100;

    if (addzoom > 0 && addzoom < 100) {
      zoomLevel = addzoom;
    }
  }

  let boxShowNames = document.getElementById("checkboxShowNames");
  boxShowNames.oninput = function(){
    showName = boxShowNames.checked;
  }
}
function InitializeTargetPlanets(){
  document.getElementById("target_sun").onclick = function(){SetTargetedPlanet("sun")};
  document.getElementById("target_mercury").onclick = function(){SetTargetedPlanet("mercury")};
  document.getElementById("target_venus").onclick = function(){SetTargetedPlanet("venus")};
  document.getElementById("target_earth").onclick = function(){SetTargetedPlanet("earth")};
  document.getElementById("target_mars").onclick = function(){SetTargetedPlanet("mars")};
  document.getElementById("target_jupiter").onclick = function(){SetTargetedPlanet("jupiter")};
  document.getElementById("target_saturn").onclick = function(){SetTargetedPlanet("saturn")};
  document.getElementById("target_uaranus").onclick = function(){SetTargetedPlanet("uranus")};
  document.getElementById("target_neptune").onclic = function(){SetTargetedPlanet("neptune")};
}

function UpdateAnimationSolarSystem() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ShowPlanets();

  requestAnimationFrame(UpdateAnimationSolarSystem);
}
function ShowPlanets(){
  let cW = canvas2.width/2;
  let cH = canvas2.height/2;

  let date = new Date() / 1000;
  let planetsZoom = zoomLevel/20;
  let planetsOffMult = 75;
  let planetsAddPosition = planetsZoom * planetsOffMult;

  let mercuryX = Math.sin(date/36 + dateOff) * Mercury.planetOffsetX * planetsAddPosition;
  let mercuryY = Math.cos(date/36 + dateOff) * Mercury.planetOffsetX * planetsAddPosition;

  let venusX = Math.sin(date/50 + dateOff) * Venus.planetOffsetX * planetsAddPosition;
  let venusY = Math.cos(date/50 + dateOff) * Venus.planetOffsetX * planetsAddPosition;

  let earthX = Math.sin(date/67 + dateOff) * Earth.planetOffsetX * planetsAddPosition;
  let earthY = Math.cos(date/67 + dateOff) * Earth.planetOffsetX * planetsAddPosition;

  let marsX = Math.sin(date/90 + dateOff) * Mars.planetOffsetX * planetsAddPosition;
  let marsY = Math.cos(date/90 + dateOff) * Mars.planetOffsetX * planetsAddPosition;

  let jupiterX = Math.sin(date/78 + dateOff) * Jupiter.planetOffsetX * planetsAddPosition;
  let jupiterY = Math.cos(date/78 + dateOff) * Jupiter.planetOffsetX * planetsAddPosition;

  let saturnX = Math.sin(date/68 + dateOff) * Saturn.planetOffsetX * planetsAddPosition;
  let saturnY = Math.cos(date/68 + dateOff) * Saturn.planetOffsetX * planetsAddPosition;

  let neptuneX = Math.sin(date/150 + dateOff) * Neptune.planetOffsetX * planetsAddPosition;
  let neptuneY = Math.cos(date/150 + dateOff) * Neptune.planetOffsetX * planetsAddPosition;

  let uranusX = Math.sin(date/500 + dateOff) * Uranus.planetOffsetX * planetsAddPosition;
  let uranusY = Math.cos(date/500 + dateOff) * Uranus.planetOffsetX * planetsAddPosition;

  switch (pointPlanet) {
    case "mercury":
      centerX = mercuryX;
      centerY = mercuryY;
      break;
    case "venus":
      centerX = venusX;
      centerY = venusY;
      break;
    case "earth":
      centerX = earthX;
      centerY = earthY;
      break;
    case "mars":
      centerX = marsX;
      centerY = marsY;
      break;
    case "jupiter":
      centerX = jupiterX;
      centerY = jupiterY;
      break;
    case "saturn":
      centerX = saturnX;
      centerY = saturnY;
      break;
    case "uranus":
      centerX = uranusX;
      centerY = uranusY;
      break;
    case "neptune":
      centerX = neptuneX;
      centerY = neptuneY;
      break;
    default:
      centerX = 0;
      centerY = 0;
  }

  Sun.Show(cW, cH);

  Mercury.ShowEllipse(planetsOffMult);
  Mercury.Show(cW + mercuryX, cH + mercuryY);

  Venus.ShowEllipse(planetsOffMult);
  Venus.Show(cW + venusX, cH + venusY);

  Earth.ShowEllipse(planetsOffMult);
  Earth.Show(cW + earthX, cH + earthY);

  Mars.ShowEllipse(planetsOffMult);
  Mars.Show(cW + marsX, cH + marsY);

  Jupiter.ShowEllipse(planetsOffMult);
  Jupiter.Show(cW + jupiterX, cH + jupiterY);

  Saturn.ShowEllipse(planetsOffMult);
  Saturn.Show(cW + saturnX, cH + saturnY);

  Neptune.ShowEllipse(planetsOffMult);
  Neptune.Show(cW + neptuneX, cH + neptuneY);

  Uranus.ShowEllipse(planetsOffMult);
  Uranus.Show(cW + uranusX, cH + uranusY);
}
function SetTargetedPlanet(planetName){
  pointPlanet = planetName;
}

document.getElementById("inputAddedDay").oninput = function(){
  let date = document.getElementById("inputAddedDay");

  let year = date[0];
  let month = date[1];
  let day = date[2];

  let dateNow = new Date();

  dateOff = +year;
}

class CosmicBody{
  constructor(image, name, size, planetOffsetX){
    this.image = document.getElementById(image);
    this.image.width = size;
    this.image.height = size;
    this.name = name;
    this.size = size;
    this.planetOffsetX = planetOffsetX;
  }

  Show(px, py){
    let fixedZoom = zoomLevel/20;

    ctx2.drawImage(
      this.image,
      px - centerX - this.size/2 * fixedZoom,
      py - centerY - this.size/2 * fixedZoom,
      this.size * fixedZoom,
      this.size * fixedZoom
    );

    if (showName) {
      ctx2.strokeText(this.name, px - centerX, py - centerY + 10);
      ctx2.fillText(this.name, px - centerX, py - centerY + 10);
    }
  }

  ShowEllipse(offset, offPx = 0, offPy = 0){
    let fixedZoom = zoomLevel/20;

    ctx2.beginPath();
    ctx2.ellipse(
      canvas2.width/2 + offPx - centerX,
      canvas2.height/2 + offPy - centerY,
      this.planetOffsetX * fixedZoom * offset,
      this.planetOffsetX * fixedZoom * offset,
      Math.PI / 4, 0, 2 * Math.PI
    );
    ctx2.stroke();
  }
}

SetupAnimationSolarSystem();
