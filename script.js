
// Variables
// _________________________
var prepostions = [
  "to",
  "around",
  "by",
  "for",
  "in"
];

var properNouns = [
  "Aztecs",
  "Iroqois League",
  "Maya",
  "Mississippians",
  "Inca"
];

var verbs = [
  "migrate",
  "emerge",
  "adapt",
  "modify",
  "characterize"
];

var commonNouns = [
  "ice age",
  "adobe",
  "tribe",
  "city state",
  "civilization",
  "technological\nachievement",
  "culture",
  "cruelty",
  "savage"
];



// Global Variables
var canvas = new fabric.Canvas('c');
var wordBankOffsetX = 600;
var wordBankOffsetY = 20;
var questionOffsetY = 220;
var wordBank = [];
var questions = [];
var questionBlanks = [];
var isHovering = false;


// Setup
// _________________________

// Setting up the word bank
for (var i = commonNouns.length - 1; i >= 0; i--) {    
  
  var column = (i < 4) ? 0 : 220;
  var row = (i < 4) ? i : i - 4;

  // Saving position info to wordbank array
  wordBank[commonNouns[i]] = {"word": commonNouns[i], "column": wordBankOffsetX + column, "row": (100 * row) + wordBankOffsetY };
  
  // Creating the box and word label
  createWord(commonNouns[i], wordBank[commonNouns[i]].column, wordBank[commonNouns[i]].row);  
}


// Setting up the questions
questions = [
  ["The use of", wordBank["adobe"], "as a building material was a great ", wordBank["technological\nachievement"], "."],
  ["The use of", wordBank["adobe"], "as a building material was a great ", wordBank["technological\nachievement"], "."]
];


showQuestion(questions[0]);







// Functions
// _________________________
// Create word in word bank.
function createWord(word, left, top) {

  // Create a rectangle object
  var rect = new fabric.Rect({        
    fill: '#248cb5',
    width: 200,
    height: 80
  });

  var text = new fabric.Text(word, {
    left: 40,
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

  // Add mouseUp event listener
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

// Returns objects to their original position
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
        fill: "white",
        fontFamily: "Helvetica",  
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
        fill: '#6ef062',
        
        hoverCursor: 'default',
        radius: 20,        
        left: 40,
        top: (60 * i) + questionOffsetY,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        originY: 'center',
        shadow: 'rgba(0,0,0,0.2) 0px 0px 10px'
      });

      circle.on('mouseover', function(){      
          this.animate('radius', 30, { 
          onChange: canvas.renderAll.bind(canvas), 
          duration: 300,
          easing: fabric.util.ease.easeOutBounce
        });
      });

      circle.on('mouseout', function(){      
          this.animate('radius', 20, { 
          onChange: canvas.renderAll.bind(canvas), 
          duration: 300,
          easing: fabric.util.ease.easeOutBounce
        });
      });

      questionBlanks.push({'coords': circle, 'word': question[i].word});
      canvas.add(circle);


    } else {

      var text = new fabric.Text(question[i], {
        left: 40,
        top: (60 * i) + questionOffsetY,    
        fill: "white",
        fontFamily: "Roboto",  
        fontSize: 22,
        hoverCursor: 'default'
      });

      canvas.add(text);

    }
  }
}
