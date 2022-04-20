/*
References:
1. https://github.com/p5-serial/p5.serialport
2. https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
*/

//const mlURL = "https://teachablemachine.withgoogle.com/models/tHvhJxqGD/";
const mlURL = "https://teachablemachine.withgoogle.com/models/IvsNWRvzD/"
const flip = true;
const port = "COM3";


let model, capture, topPrediction, numClasses, poseData, context, serial, postList
let videoWidth = 480
let videoHeight = 360


async function init() {
  const modelURL = mlURL + "model.json";
  const metadataURL = mlURL + "metadata.json";
  model = await tmPose.load(modelURL, metadataURL);
  numClasses = model.getTotalClasses();
}

async function predict() {
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(capture.elt, flip)
  

  const predictions = await model.predict(posenetOutput)
  let highestProbability = 0
  let highestIndex
  predictions.forEach((item, index) => {
    if (item.probability > highestProbability) {
      highestProbability = item.probability
      highestIndex = index
    }
  })

  poseData = pose
  topPrediction = predictions[highestIndex].className

}

function setup() {
  frameRate(10);
  const canvas = createCanvas(windowWidth, windowHeight);
  context = canvas.elt.getContext('2d')
  capture = createCapture(VIDEO)
  capture.size(videoWidth, videoHeight)
  capture.hide()
  textSize(20)
  serial = new p5.SerialPort();
  //portList = serial.list();
  //port = portList[portList.length - 1];
  serial.open(port);
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);

  init()
}

async function draw() {
  background(220)

  imageMode(CORNER)
  push()
  translate(videoWidth, 0);
  scale(-1, 1);
  image(capture, 0, 0, videoWidth, videoHeight)
  fill(0)
  rect(0,videoHeight,videoWidth, 20)
  if (poseData) {
   const minPartConfidence = 0.5;
      tmPose.drawKeypoints(poseData.keypoints, minPartConfidence, context);
      tmPose.drawSkeleton(poseData.keypoints, minPartConfidence, context); 
  }
  pop()
  
  /************************
    Add class logic here
  ************************/
  strokeWeight(4)
  stroke(0)
  fill(255)
  //console.log(topPrediction);
  if (topPrediction == undefined) {
    text("Not Reading Data", 50, videoHeight+15)
  } else {
    text(topPrediction,  50, videoHeight+15)
  }
  sendSerial(topPrediction);
  
  await predict()
}

// Serial methods
// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

function sendSerial(label) {
  if (label === "Awake"){
    serial.write('1');
  }else if (label === "Right") {
    serial.write('2');
  }else if (label === "Left") {
    serial.write('3'); 
  }else if (label === "Timeout") {
    serial.write('4');   
  }else if (label === "Inactive") {
    serial.write('5');
  }
}
//"Awake","Left","Right","Timeout","Inactive"