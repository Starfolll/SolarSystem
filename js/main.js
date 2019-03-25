let DivSolarSystem;
let SolarSystemCanvas;
let DivActionBar;

window.onload = function(){
  DivSolarSystem = document.getElementById("divSolarSystem");
  DivActionBar = document.getElementById("actionBar");
  SolarSystemCanvas = document.getElementById("solarSystemCanvas");
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

let isShowSpace = true;
document.getElementById("ButtonShowCosmicSpace").onclick = function(){
  isShowSpace = !isShowSpace;
  if (isShowSpace) {
    DivSolarSystem.style.visibility = null;
    DivActionBar.style.visibility = "hidden";
    SolarSystemCanvas.style.visibility = "hidden";
  }else{
    SolarSystemCanvas.style.visibility = null;
    DivActionBar.style.visibility = null;
    DivSolarSystem.style.visibility = "hidden";
  }
}
