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

let comet;

let spaceShip;

let showName = true;
let zoomLevel = 10;
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
	InitializeComet();

	requestAnimationFrame(UpdateAnimationSolarSystem);
}

function SolarSystemGetPercentPosition(num) {
	return (num - 57910006) * (100 - 1) / (4504299579 - 57910006) + 1;
}

function InitializeBodys() {
	Sun = new Planet("img_sun", "Sun", 75);
	Mercury = new Planet("img_mercury", "Mercury", 50, SolarSystemGetPercentPosition(57910006));
	Venus = new Planet("img_venus", "Venus", 50, SolarSystemGetPercentPosition(108199995));
	Earth = new Planet("img_earth", "Earth", 50, SolarSystemGetPercentPosition(149599951));
	Mars = new Planet("img_mars", "Mars", 50, SolarSystemGetPercentPosition(227939920));
	Jupiter = new Planet("img_jupiter", "Jupiter", 50, SolarSystemGetPercentPosition(778330257));
	Saturn = new Planet("img_saturn", "Saturn", 50, SolarSystemGetPercentPosition(1429400028));
	Uranus = new Planet("img_uranus", "Uranus", 50, SolarSystemGetPercentPosition(2870989228));
	Neptune = new Planet("img_neptune", "Neptune", 50, SolarSystemGetPercentPosition(4504299579));
}

function InitializeActions() {
	let zoom = document.getElementById("getScroll");
	zoom.onwheel = function onWheel(e) {
		if (!!comet) {
			comet.tail = [];
		}
		let delta = e.deltaY;

		let addzoom = zoomLevel + delta / 100;

		if (addzoom > 0.5 && addzoom < 100) {
			zoomLevel = addzoom;
		} else if (addzoom > 0.5) {
			zoomLevel = 100;
		} else if (addzoom < 100) {
			zoomLevel = 0.5;
		}
	}

	let boxShowNames = document.getElementById("checkboxShowNames");
	boxShowNames.oninput = function () {
		showName = boxShowNames.checked;
	}
}

function InitializeTargetPlanets() {
	document.getElementById("target_sun").onclick = function () {
		SetTargetedPlanet("sun")
	};
	document.getElementById("target_mercury").onclick = function () {
		SetTargetedPlanet("mercury")
	};
	document.getElementById("target_venus").onclick = function () {
		SetTargetedPlanet("venus")
	};
	document.getElementById("target_earth").onclick = function () {
		SetTargetedPlanet("earth")
	};
	document.getElementById("target_mars").onclick = function () {
		SetTargetedPlanet("mars")
	};
	document.getElementById("target_jupiter").onclick = function () {
		SetTargetedPlanet("jupiter")
	};
	document.getElementById("target_saturn").onclick = function () {
		SetTargetedPlanet("saturn")
	};
	document.getElementById("target_uaranus").onclick = function () {
		SetTargetedPlanet("uranus")
	};
	document.getElementById("target_neptune").onclick = function () {
		SetTargetedPlanet("neptune")
	};
}

function InitializeComet() {
	comet = new Comet(0, 0, 1);
}

function UpdateAnimationSolarSystem() {
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

	ShowPlanets();

	requestAnimationFrame(UpdateAnimationSolarSystem);
}

function ShowPlanets() {
	let cW = canvas2.width / 2;
	let cH = canvas2.height / 2;

	let date = new Date() / 1000;
	let planetsZoom = zoomLevel / 20;
	let planetsOffMult = 75;
	let planetsAddPosition = planetsZoom * planetsOffMult;

	let mercuryX = Math.sin(date / 36 + dateOff) * Mercury.planetOffsetX * planetsAddPosition;
	let mercuryY = Math.cos(date / 36 + dateOff) * Mercury.planetOffsetX * planetsAddPosition;

	let venusX = Math.sin(date / 50 + dateOff) * Venus.planetOffsetX * planetsAddPosition;
	let venusY = Math.cos(date / 50 + dateOff) * Venus.planetOffsetX * planetsAddPosition;

	let earthX = Math.sin(date / 67 + dateOff) * Earth.planetOffsetX * planetsAddPosition;
	let earthY = Math.cos(date / 67 + dateOff) * Earth.planetOffsetX * planetsAddPosition;

	let marsX = Math.sin(date / 90 + dateOff) * Mars.planetOffsetX * planetsAddPosition;
	let marsY = Math.cos(date / 90 + dateOff) * Mars.planetOffsetX * planetsAddPosition;

	let jupiterX = Math.sin(date / 78 + dateOff) * Jupiter.planetOffsetX * planetsAddPosition;
	let jupiterY = Math.cos(date / 78 + dateOff) * Jupiter.planetOffsetX * planetsAddPosition;

	let saturnX = Math.sin(date / 68 + dateOff) * Saturn.planetOffsetX * planetsAddPosition;
	let saturnY = Math.cos(date / 68 + dateOff) * Saturn.planetOffsetX * planetsAddPosition;

	let uranusX = Math.sin(date / 500 + dateOff) * Uranus.planetOffsetX * planetsAddPosition;
	let uranusY = Math.cos(date / 500 + dateOff) * Uranus.planetOffsetX * planetsAddPosition;

	let neptuneX = Math.sin(date / 150 + dateOff) * Neptune.planetOffsetX * planetsAddPosition;
	let neptuneY = Math.cos(date / 150 + dateOff) * Neptune.planetOffsetX * planetsAddPosition;

	let cometX = Math.sin(date + dateOff) * comet.cometOffset * planetsAddPosition * 1.3 + (0 * planetsZoom);
	let cometY = Math.cos(date + dateOff) * comet.cometOffset * planetsAddPosition * 3 - (150 * planetsZoom);

	let shipX;
	let shipY;

	if (!!spaceShip) {
		shipX = spaceShip.px * 1.5 * planetsAddPosition;
		shipY = spaceShip.py * 1.5 * planetsAddPosition;
		spaceShip.Show(shipX, shipY);
	}

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
	case "sun":
		centerX = 0;
		centerY = 0;
		break;
	case "comet":
		centerX = cometX;
		centerY = cometY;
		break;
	case "spaceShip":
		if (!!spaceShip) {
			centerX = shipX;
			centerY = shipY;
		}
		break;
	default:
		centerX = 0;
		centerY = 0;
		break;
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

	comet.px = cW + cometX;
	comet.py = cH + cometY;
	comet.ShowTail();
	comet.Show();
}

function SetTargetedPlanet(planetName) {
	pointPlanet = planetName;
}

class Planet {
	constructor(image, name, size, planetOffsetX) {
		this.image = document.getElementById(image);
		this.image.width = size;
		this.image.height = size;
		this.name = name;
		this.size = size;
		this.planetOffsetX = planetOffsetX;
	}

	Show(px, py) {
		let fixedZoom = zoomLevel / 20;

		ctx2.drawImage(
			this.image,
			px - centerX - this.size / 2 * fixedZoom,
			py - centerY - this.size / 2 * fixedZoom,
			this.size * fixedZoom,
			this.size * fixedZoom
		);

		if (showName) {
			ctx2.font = (fixedZoom * 20 + 10) + "px Arial";
			ctx2.strokeText(this.name, px - centerX, py - centerY + 10);
			ctx2.fillText(this.name, px - centerX, py - centerY + 10);
		}
	}

	ShowEllipse(offset, offPx = 0, offPy = 0) {
		let fixedZoom = zoomLevel / 20;

		ctx2.beginPath();
		ctx2.ellipse(
			canvas2.width / 2 + offPx - centerX,
			canvas2.height / 2 + offPy - centerY,
			this.planetOffsetX * fixedZoom * offset,
			this.planetOffsetX * fixedZoom * offset,
			Math.PI / 4, 0, 2 * Math.PI
		);
		ctx2.stroke();
	}
}

class Comet {
	constructor(px, py, offset) {
		this.px = px;
		this.py = py;
		this.size = 4;
		this.cometOffset = offset;

		this.tail = [];
	}

	Show() {
		let fixedZoom = zoomLevel / 20;

		ctx2.beginPath();
		ctx2.fillStyle = "white";

		ctx2.ellipse(
			this.px - centerX - this.size / 2 * fixedZoom,
			this.py - centerY - this.size / 2 * fixedZoom,
			this.size * fixedZoom,
			this.size * fixedZoom,
			Math.PI / 4, 0, 2 * Math.PI
		);
		ctx2.fill();

		ctx2.fillStyle = "black";
	}

	ShowTail() {
		let fixedZoom = zoomLevel / 20;
		if (this.tail.length < 100) {
			this.tail.push(new CometTailParticle(
				this.px,
				this.py,
				5,
        [255, 255, 255]
			));
		}

		if (this.tail[0].alpha <= 0.01) {
			this.tail.shift();
		}

		for (var i = 0; i < this.tail.length; i++) {
			this.tail[i].alpha -= 0.02;

			this.tail[i].Show(this.px - centerX - this.size / 2 * fixedZoom, this.py - centerY - this.size / 2 * fixedZoom);
		}
	}
}

class CometTailParticle {
	constructor(px, py, size, color, date) {
		this.px = px;
		this.py = py;
		this.size = size;
		this.fixedSize = size;
		this.alpha = 1;
		this.color = color;
		this.date = date;
	}

	Show() {
		let fixedZoom = zoomLevel / 20;

		ctx2.beginPath();
		ctx2.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;

		ctx2.ellipse(
			this.px - centerX - this.size / 2 * fixedZoom,
			this.py - centerY - this.size / 2 * fixedZoom,
			this.size * fixedZoom,
			this.size * fixedZoom,
			Math.PI / 4, 0, 2 * Math.PI
		);
		ctx2.fill();

		ctx2.fillStyle = "black";
	}
}

class SpaceShip {
	constructor(px, py, image) {
		this.px = px;
		this.py = py;
		this.size = 5;
		this.speed = 3;
		this.image = image;
	}

	Show(dx, dy) {
		let fixedZoom = zoomLevel / 20;

		ctx2.drawImage(
			this.image,
			this.px + dx - centerX - this.size / 2 * fixedZoom,
			this.py + dy - centerY - this.size / 2 * fixedZoom,
			this.size * fixedZoom,
			this.size * fixedZoom
		);
	}

	Update(dx, dy) {
		this.px += dx * this.speed;
		this.py += dy * this.speed;
	}
}

SetupAnimationSolarSystem();