<<<<<<< HEAD
let DivSolarSystem;
let SolarSystemCanvas;
let SolarSystemBackground;
let DivActionBar;

let isShowSpace = true;
window.onload = function(){
  DivSolarSystem = document.getElementById("divSolarSystem");
  DivActionBar = document.getElementById("actionBar");
  SolarSystemBackground = document.getElementById("solarSystemBackground");
  SolarSystemCanvas = document.getElementById("solarSystemCanvas");

  CreateImageShowSolarSystem();
}

function CreateImageShowSolarSystem(){
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
    let div = document.createElement("DIV");
    div.setAttribute("class", "cosmicSpace");

    let img = document.createElement("img");
    img.setAttribute("src", "icons/planet-earth.svg");
    img.onclick = function(){
      isShowSpace = !isShowSpace;
      if (isShowSpace) {
        DivSolarSystem.style.visibility = null;
        DivActionBar.style.visibility = "hidden";
        SolarSystemCanvas.style.visibility = "hidden";
        let checbox = document.getElementById("checkboxShowStars");
        if(!checbox.checked){
          document.getElementById("checkboxShowStars").click();
        }
      }else{
        SolarSystemCanvas.style.visibility = null;
        DivActionBar.style.visibility = null;
        DivSolarSystem.style.visibility = "hidden";
      }
    }

    div.appendChild(img);
    document.getElementsByClassName("navBar")[0].appendChild(div);
  }
}

window.onresize = function(){
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  ctx2.font = "32px Arial";
  ctx2.textAlign = "center";
  ctx2.fillStyle = "black";
  ctx2.strokeStyle = "white";
  ctx2.lineWidth = 3;

  backgroundColor = 1;

  for (var i = 0; i < starsCount; i++) {
    stars[i].ResetXY();
  }
}
=======
let DivSolarSystem;
let SolarSystemCanvas;
let SolarSystemBackground;
let DivActionBar;

let isShowSpace = true;
window.onload = function(){
  DivSolarSystem = document.getElementById("divSolarSystem");
  DivActionBar = document.getElementById("actionBar");
  SolarSystemBackground = document.getElementById("solarSystemBackground");
  SolarSystemCanvas = document.getElementById("solarSystemCanvas");

  CreateImageShowSolarSystem();
}

function CreateImageShowSolarSystem(){
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
    let div = document.createElement("DIV");
    div.setAttribute("class", "cosmicSpace");

    let img = document.createElement("img");
    img.setAttribute("src", "icons/planet-earth.svg");
    img.onclick = function(){
      isShowSpace = !isShowSpace;
      if (isShowSpace) {
        DivSolarSystem.style.visibility = null;
        DivActionBar.style.visibility = "hidden";
        SolarSystemCanvas.style.visibility = "hidden";
        let checbox = document.getElementById("checkboxShowStars");
        if(!checbox.checked){
          document.getElementById("checkboxShowStars").click();
        }
      }else{
        SolarSystemCanvas.style.visibility = null;
        DivActionBar.style.visibility = null;
        DivSolarSystem.style.visibility = "hidden";
      }
    }

    div.appendChild(img);
    document.getElementsByClassName("navBar")[0].appendChild(div);
  }
}

window.onresize = function(){
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  backgroundColor = 1;

  for (var i = 0; i < starsCount; i++) {
    stars[i].ResetXY();
  }
}
>>>>>>> e58259585391169bc8b75b54137f0c46befcb964
