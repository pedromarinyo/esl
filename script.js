// Global Variables
// _________________________
var canvas = new fabric.Canvas('c');
var expeditionDetailsCard; 
var expeditionDetailsButton;

var wordBankOffsetX = 640;
var wordBankOffsetY = 240;
var questionOffsetX = 40;
var questionOffsetY = 240;

var postcardOffsetX = 10;
var postcardOffsetY = 20;

var wordBank = [];
var questions = [];
var questionBlanks = [];
var isHovering = false;
var columnLength = 5;

var showPostcard = false;
var showWordBank = false;
var showQuestions = false;
var fadeInOutRect;
fabric.Object.prototype.objectCaching = false;





// ___________________________________________________________________________
// Setup
// ___________________________________________________________________________

// Drawing map
drawMap();    

// Drawing postcard  
if (showPostcard) { drawPostcard(); }





// ___________________________________________________________________________
// Phases
// ___________________________________________________________________________

// Introduction
function chapterIntroduction() {
  // Show verbal instructions

}





// ___________________________________________________________________________
// Phases
// ___________________________________________________________________________

// Interface Functions
// Draw map
function drawMap() {
  
  // Creating map image
  fabric.Image.fromURL('assets/map_aged.png', function(oImg) {
    oImg.scale(1);
    
    oImg.left = canvas.width / 2;
    oImg.top = canvas.height / 2;
    oImg.hasControls = false;
    oImg.hasBorders = false;
    oImg.lockMovementX = true;
    oImg.lockMovementY = true;
    oImg.hoverCursor = "default";
    oImg.originY = "center";
    oImg.originX = "center";   
    oImg.selectable = false;
    canvas.add(oImg);  
    
    oImg.sendToBack();         
  });

  // Drawing clouds
  var clouds = fabric.Image.fromURL('assets/clouds.png', function(oImg) {
    oImg.scale(1);
    oImg.left = canvas.width / 2;
    oImg.top = canvas.height / 2;   
    oImg.hoverCursor = "default";
    oImg.originY = "center";
    oImg.originX = "left";   
    oImg.selectable = false;
    canvas.add(oImg);  
    oImg.sendToBack();
    animateClouds(oImg);
  });

  // Drawing travel lines
  var line = new fabric.Line([400, 300, 400, 300],{
    stroke: '#eb4545',
    strokeWidth: 3,
    strokeDashArray: [true, true, false],
    strokeLineJoin: "round",
    hasControls: false,
    hasBorders: false,
    selectable: false,
    lockMovementX: true,
    lockMovementY: true,
  });
  canvas.add(line);
  line.bringToFront();
  animateTravelLines_to(line);
  
  // Adding expiditions markers  
  for (let [expeditionName, expedition] of expeditions) {
    createExpeditionMarker(expedition);
  }

  // Adding blank expedition details card
  createExpeditionDetails();  

  // Drawing fading in, out rectangle
  fadeInOutRect = new fabric.Circle({
    left: 1024/2,
    top: 768/2,
    fill: 'black',
    opacity: '1',
    radius: 0,
    originY: 'center',
    originX: 'center'    
  });

  canvas.add(fadeInOutRect);
}

function createExpeditionMarker(expedition) {
  
  // Create a circle object
  var circle = new fabric.Circle({        
    fill: '#00a99d',
    
    hoverCursor: 'default',
    radius: 15,        
    left: expedition.coordX,
    top: expedition.coordY,
    hasControls: false,
    hasBorders: false,
    selectable: false,
    lockMovementX: true,
    lockMovementY: true,
    originY: 'center',
    originX: 'center',
    shadow: 'rgba(0,0,0,0.2) 0px 0px 10px',
    expedition: expedition
  });
  
  canvas.add(circle);
  circle.bringToFront();  


  // Add click/tap gesture event listener to expedition markers
  circle.on("mouseup", function() {  
    updateExpeditionDetails(expedition);
  });
}

// Create expedition details card
function createExpeditionDetails() {

  // Creating card
  var rect = new fabric.Rect({        
    fill: '#669b9d',
    opacity: 0.9,    
    hoverCursor: 'default',
    width: 300,        
    height: 400,
    left: 20,
    top: 20,
    cornerRadius: 10,

    originY: 'top',
    originX: 'left',
    shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
  });

  // Creating title
  var title = new fabric.Textbox("Expedition Details", {
    left: 30,
    top: 30,
    width: 280,
    height: 50,
    fill: "#fff",
    fontFamily: 'satisfy',  
    fontSize: 32,
    hoverCursor: 'default',
    textAlign: "center"
  });


  // Creating description
  var description = new fabric.Textbox("Choose a destination", {
    left: 40,
    top: 90,
    width: 260,
    height: 320,
    fill: "#fff",
    fontFamily: 'hevetica',  
    fontSize: 18,
    hoverCursor: 'default',
    textAlign: "left"
  });

  // Creating card group
  expeditionDetailsCard = new fabric.Group([rect, title, description], {
    left: 40,
    hasControls: false,
    hasBorders: false,
    selectable: false,
    lockMovementX: true,
    lockMovementY: true    
  }); 


  // Creating thumbnail image and adding to card group
  fabric.Image.fromURL("assets/pantheon_past1.png", function(oImg) {
    oImg.scale(0.31);
    
    oImg.left = 0;
    oImg.top = 250;
    
    oImg.hasControls = false;
    oImg.hasBorders = false;
    oImg.lockMovementX = true;
    oImg.lockMovementY = true;
    oImg.hoverCursor = "default";
    oImg.originY = "left";
    oImg.originX = "center";   
    oImg.selectable = false;

    expeditionDetailsCard.add(oImg);       
  });

  // _____
    
  // Creating button
  var button = new fabric.Rect({        
    fill: '#feff80',
    opacity: 1,    
    hoverCursor: 'pointer',
    width: 200,        
    height: 60,    
    
    
    originY: 'top',
    originX: 'left',
    shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
  });

  // Creating button label
  var label = new fabric.Textbox("Start!", {
    width: 180,  
    left: 10,
    top: 10,    
    fill: "#000",
    fontFamily: 'satisfy',  
    fontSize: 32,
    hoverCursor: 'default',
    textAlign: "center"
  });

  // Creating expedition details button group
  expeditionDetailsButton = new fabric.Group([button, label], {
    top: 550,
    left: -200,
    hasControls: false,
    hasBorders: false,
    selectable: false,
    lockMovementX: true,
    lockMovementY: true,
    hoverCursor: "pointer"  
  }); 
  
  // Adding to canvas  
  canvas.add(expeditionDetailsCard);
  canvas.add(expeditionDetailsButton);
}

// Update expedition details card
function updateExpeditionDetails(expedition) {
  
  // Updating details via global variable
  canvas.remove(expeditionDetailsCard);
  expeditionDetailsButton.left = -300;
  expeditionDetailsCard.left = -300;
  expeditionDetailsCard.item(1).text = expedition.name;
  expeditionDetailsCard.item(2).text = expedition.description;
  expeditionDetailsCard.item(3).setSrc(expedition.image);

  expeditionDetailsCard.animate({'left': 40}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 600,
    easing: fabric.util.ease.easeOutQuad
  });

  expeditionDetailsButton.animate({'left': 90}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 1000,
    easing: fabric.util.ease.easeOutBack
  });

  // Refresh canvas
  canvas.add(expeditionDetailsCard);

  expeditionDetailsButton.bringToFront();
  expeditionDetailsButton.on("mouseup", function() {  
    fadeOut(1000);
  });

}

// Animate map lines and clouds
function animateTravelLines_to(line) {

  // Generate random coordinates
  var coords = [
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height)
  ];
  
  line.x1 = line.x2;
  line.y1 = line.y2;
  

  line.animate({'x2': coords[0], 'y2': coords[1], 'opacity': 1}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 50000,
    easing: fabric.util.ease.easeInOutQuad,
    onComplete: function() {animateTravelLines_from(line);}
  });   
}
function animateTravelLines_from(line) {
  line.animate({'opacity': 0}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 1000,
    easing: fabric.util.ease.easeInQuad,
    onComplete: function() {animateTravelLines_to(line);}
  });  
}
function animateClouds(clouds) {  
  clouds.left = -2000;
  clouds.animate({'left': 1024}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 80000,
    easing: fabric.util.ease.easeOutSquare,
    onComplete: function() {animateClouds(clouds);}
  });      
}

// Create word in word bank.
function createWord(word, left, top) {

  // Create a rectangle object
  var rect = new fabric.Rect({        
    fill: '#248cb5',
    width: 140,
    height: 60
  });

  var text = new fabric.Text(word, {
    left: 20,
    top: 20,    
    fill: "white",
    fontFamily: "Roboto",
    fontSize: 18
  });

  var circle = new fabric.Circle({
    fill: '#ffffff',
    radius: 10,   
    left: -10,                 
    originY: 'center',
    shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
  });

  // Group text label and box
  var group = new fabric.Group([ rect, text, circle ], {
    left: left,
    top: top,
    hasControls: false,
    hasBorders: false,
    shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
  });

  // Add Mouse Up event listener
  group.on('mouseup', function(){      
    
    var isCorrect = false;

    // Check if word has been dropped in the correct blank spot
    for (var i = questionBlanks.length - 1; i >= 0; i--) {
    
      var _xDelta = (this.oCoords.tl.x > questionBlanks[i].coords.oCoords.tl.x &&  this.oCoords.tl.x < questionBlanks[i].coords.oCoords.tr.x) ? true : false;
      var _yDelta = (this.oCoords.tl.y > questionBlanks[i].coords.oCoords.tl.y &&  this.oCoords.tl.y < questionBlanks[i].coords.oCoords.bl.y) ? true : false;

      // If hovering over a blank spot that's the same as the answer, the answer is correct!
      if (_xDelta && _yDelta && questionBlanks[i].word == word) {              
        console.log("Correct!");
        revealAnswer(questionBlanks[i], this);
        isCorrect = true;
        break;
      }                      
      
    }
    
    if(!isCorrect) {
      console.log("return");
      returnToPosition(this, wordBank[word].column, wordBank[word].row);  
    }

  });


  // Add rectangle onto canvas
    canvas.add(group);
}

// Return object to original position
function returnToPosition(object, left, top) {
  object.animate({'top': top, 'left': left}, { 
    onChange: canvas.renderAll.bind(canvas), 
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
  });
}

// Reveal word upon correct answer
function revealAnswer(blankWord, wordBank) {
  // Remove blank work bubble
  blankWord.coords.animate({'left': 0, 'opacity': 0}, {onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeIn, duration: 500});
  
  // Write correct word in its place
  var text = new fabric.Text(blankWord.word, {
        left: blankWord.coords.left + 20,
        top: blankWord.coords.top,    
        fill: "#333",
        fontFamily: "hevetica",  
        fontSize: 28,
        opacity: 0
      });

  console.log(blankWord.word);
  canvas.add(text);
  text.animate({'opacity': 1, 'left': '-=20'}, {onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeIn, duration: 500});

  // Remove word bank word
  wordBank.animate('opacity', 0, {onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeIn, duration: 100});
}

// Display question
function showQuestion(question) {
  
  // Saving blank circles to array
  questionBlanks = [];

  for (var i = question.length - 1; i >= 0; i--) {    

    if (question[i].row) {
      
      // Create a circle object
      var circle = new fabric.Circle({        
        fill: '#7cbf78',
        
        hoverCursor: 'default',
        radius: 20,        
        left: questionOffsetX,
        top: (60 * i) + questionOffsetY,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        originY: 'center',
        shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
      });

      questionBlanks.push({'coords': circle, 'word': question[i].word});
      canvas.add(circle);


    } else {

      // Create text
      var text = new fabric.Text(question[i], {
        left: questionOffsetX,
        top: (60 * i) + questionOffsetY,    
        fill: "#333",
        fontFamily: 'satisfy',  
        fontSize: 32,
        hoverCursor: 'default'
      });

      canvas.add(text);

    }
  }
}

// Draw postcard features
function drawPostcard() {
  
  fabric.Image.fromURL('assets/postmark.png', function(oImg) {
  
    // Adding postmark
    oImg.scale(0.45);
    oImg.opacity = 0.65;
    oImg.left = 700;
    oImg.top = 30;
    oImg.hasControls = false;
    oImg.hasBorders = false;
    oImg.lockMovementX = true;
    oImg.lockMovementY = true;
    oImg.hoverCursor = "default";
    
    canvas.add(oImg);

    // Adding line details
    canvas.add(new fabric.Line([0, 0, 0, 650], {
        left: 600,
        top: 70,
        stroke: '#333',
        strokeWidth: 2
    }));
  });
}

// Fade in, out Transition
function fadeOut(duration) {
  fadeInOutRect.bringToFront();
  fadeInOutRect.animate({'radius': 700}, {
    onChange: canvas.renderAll.bind(canvas), 
    duration: duration
  });
}

function fadeIn(duration) {
  fadeInOutRect.bringToFront();
  fadeInOutRect.animate({'radius': 0}, {
    onChange: canvas.renderAll.bind(canvas), 
    duration: duration
  });
}


