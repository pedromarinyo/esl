// Setting up the word bank
for (var i = commonNouns.length - 1; i >= 0; i--) {    
  
  var column = (i < columnLength) ? 0 : 180;
  var row = (i < columnLength) ? i : i - columnLength;

  // Saving position info to wordbank array
  wordBank[commonNouns[i]] = {"word": commonNouns[i], "column": wordBankOffsetX + column, "row": (100 * row) + wordBankOffsetY };
  
  // Creating the box and word label
  if (showWordBank) { createWord(commonNouns[i], wordBank[commonNouns[i]].column, wordBank[commonNouns[i]].row);  }  
}







// Setting up questions
questions = [
  ["The use of", wordBank["adobe"], "as a building material was a great ", wordBank["technological"], wordBank["achievement"], "."],
  ["The use of", wordBank["adobe"], "as a building material was a great ", wordBank["technological"], wordBank["achievement"], "."]
];

// Showing questions
if (showQuestions) { showQuestion(questions[0]); }




// Variables
// _________________________
// var prepostions = [
//   "to",
//   "around",
//   "by",
//   "for",
//   "in"
// ];

// var properNouns = [
//   "Aztecs",
//   "Iroqois League",
//   "Maya",
//   "Mississippians",
//   "Inca"
// ];

// var verbs = [
//   "migrate",
//   "emerge",
//   "adapt",
//   "modify",
//   "characterize"
// ];

// var commonNouns = [
//   "ice age",
//   "adobe",
//   "tribe",
//   "city state",
//   "civilization",
//   "technological",
//   "achievement",
//   "culture",
//   "cruelty",
//   "savage"
// ];