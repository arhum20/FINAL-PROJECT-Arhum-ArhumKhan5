let cnv;
let logData = [];
function setup() {
  cnv = createCanvas(windowWidth, 400);
  cnv.parent("myP5");

  windowResized();
}

function draw() {
  background("blue");
  ellipse(width / 2, height / 2, 50);
}


// Chat GPT
function windowResized() {
  // When the window is resized, get the new dimensions of the parent div
  let canvasContainer = select("#myP5");
  let cW = canvasContainer.width;
  let cH = canvasContainer.height;
  resizeCanvas(cW, cH);
}