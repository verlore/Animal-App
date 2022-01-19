// variables
var elementArray = [];
var landArray = [];
var lionPopulation = [];
var deerPopulation = [];
var bushPopulation = [];
var waterPopulation = [];
var boarderLines = [];
var newBushPopulation = [];
var newDeerPopulation = [];
var wrapperId = document.getElementById('world');

var animals = {
   thirst: 100,
   hunger: 100,
   position: 0
}

var bushes = {
   name: "plant",
   position: 0,
   face: "🌱"
}
var water = {
   name: "water",
   position: 0,
   face: "💧"
}

// RANDOM NUMBER 0 - 99 *** WHEN NEEDED ***
var random = function(){
   return Math.floor(Math.random() * 100);
} 
var randomTen = function(){
   return Math.floor(Math.random() * 10);
} 


var landArray_Generation = () => {
   for(var i = 0; i < 100; i++){
         landArray.push([i, ""])
  }
}

   //BOARDERS!
   var boarderLines_Generation = () => {
      for(let i = 0; i < 100; i++){
      if(i <= 9 || i > 90){
      boarderLines.push(i);
      } else if( i % 10 === 0){
          let a = i;
          a -= 1;
      boarderLines.push(a, i)
      }}
   }

   var occupiedLand_Update = () => {
      for(let i = 0; i < landArray.length; i++){
         if(landArray[i][1] === "lion" || landArray[i][1] === "deer" || landArray[i][1] === "Occupied") {//USE OCCUPIUED FOR WATER AND BUSH PLACEMENTS
            return newLandArray = landArray.map(occupiedCells => occupiedCells[1] === "Occupied") // check for Occupied MAYBE USE FOR BUSHES AND WATER. either false/ true
         }
      }
   }
   
      

// -----------------------------------------------------------------SPAWNING AND GENERATING
// creating and setting the new divs.
var world_Generation = () => {
   for(let i = 0; i < 100; i++){
      var wrapperId = document.getElementById('world');
      let divTag = document.createElement("div")
      let divTag1 = divTag.cloneNode(true);
      divTag1.setAttribute("class", "box")
      divTag1.setAttribute("id", i)
      elementArray.push(divTag1);
      wrapperId.appendChild(elementArray[i]);
   }
}

var resetButton = () => {
   let rButton = document.createElement("button");
   rButton.setAttribute("class", "rBtn")
   rButton.setAttribute("id", "resetButton");
   rButton.textContent = "Reset";
   const span = document.getElementById("span");
   span.replaceWith(rButton)

}


//randomly places the animals -- later on should place everything
var spawnAnimals = (a) =>{
   for(let i = 0; i < a.length;i++){
      document.getElementById(a[i].position).innerHTML = a[i].face;
  }
}

//----------------------------------------------------GENERATES EVERYTHING, LIKE THE MAIN METHOD OF THIS MOFO
var btnGenerate = document.getElementById('btn');
btnGenerate.addEventListener("click", function(){
   
   //input value for animal/ vegitation count.
   //--------------------------------------------------------LIONS
   var lionCount = document.getElementById('lionID').value;
   console.log(`lions: ${lionCount}`);

   for(let i = 0; i < lionCount; i++){ // creates new objects that fill into lionPopulation
      lionPopulation.push(animals);
  };
  
  //--------------------------------------------------------------DEER
   var deerCount = document.getElementById('deerID').value;// NEW
   console.log(`deer: ${deerCount}`);

  for(let i = 0; i < deerCount; i++){ // NEW
   deerPopulation.push(animals);
};
   //-------------------------------------------------------------BUSHES
   var bushCount = document.getElementById('bushID').value;
   console.log(`bush: ${bushCount}`);

   for(let i = 0; i < bushCount; i++){
      bushPopulation.push(bushes);
   }
   //-------------------------------------------------------------WATER HOLES
   var waterCount = document.getElementById('waterID').value;
   console.log(`water: ${waterCount}`);

   for(let i = 0; i < waterCount; i++){
      waterPopulation.push(water);
   }
   //----------------------



  //Generation of everything.
   world_Generation();
   landArray_Generation();
   boarderLines_Generation();
   gameTimer();

   // CREATES A NEW ARRAY OF LIONS WITH NEW PROPERTIES
   //------------------------------------------ LIONS
   newLionPopulation = lionPopulation.map(obj => ({...obj, position : random(), face : "🦁", movingToPos: random(), name: "lion"})); 

   newLionPopulation.forEach((value) => {
      landArray[value.position][1] = value.name; 
   })
   spawnAnimals(newLionPopulation); 

   //------------------------------------------- DEER
   newDeerPopulation = deerPopulation.map(obj => ({...obj, position : random(), face : "🦌", movingToPos: random(), name: "deer"})); // NEW

   newDeerPopulation.forEach((value) => {// NEW
      landArray[value.position][1] = value.name; 
   })
   spawnAnimals(newDeerPopulation); // NEW

   //------------------------------BUSHES
   newBushPopulation = bushPopulation.map(obj => ({...obj, position : random()}))

   newBushPopulation.forEach((value) => {// NEW
      landArray[value.position][1] = value.name; 
   })
   spawnAnimals(newBushPopulation);
   //----------------------------Water

   newWaterPopulation = waterPopulation.map(obj => ({...obj, position : random()}))
   newWaterPopulation.forEach((value) => {// NEW
      landArray[value.position][1] = value.name; 
   })
   spawnAnimals(newWaterPopulation);

// replace button with reset

resetButton();
var restButton = document.getElementById("resetButton");
restButton.addEventListener("click", function(){location.reload()})
   
})





//-------------------------------------------------------------------------------------------------MOVING

//MOVING Change and replace emojis and array.
var moveCalculate = (pos, movePos, face, name) => {
   document.getElementById(pos).innerHTML = "";
   landArray[pos][1] = "";
   let nextPos = pos;
   let nextPosArray = [];

   
   let posCheck = pos;
   posCheck = posCheck.toString();
   let movePosCheck = movePos;
   movePosCheck = movePosCheck.toString();

   //this checks for either the second digits or the first if either pos or movePos are a single digit
   posCheck = getNth(posCheck);
   movePosCheck = getNth(movePosCheck);

   // first positional check sees whether it should plus or minus ten. 
   if(pos > movePos){//-
      // checks to align the animal to the correct stop first, pos=37 and movePos=43. using last digits if 
      if(movePosCheck > posCheck){ //once these values are even the function goes onto the else.
         nextPosArray = arrayForMoving(pos, movePos); // maybe take posCheck and movePosChecl
         nextPos += nextPosArray.pop();
         
      } else {
         
      nextPosArray = arrayForMoving(pos, movePos);
      nextPos -= nextPosArray.pop();
      
      } 
      

      landArray[nextPos][1] = name; // changes the array element to occupied to be possibly used later on
      document.getElementById(nextPos).innerHTML = face; // spawns new face
      // console.log(`posCheck: ${posCheck}`);
      // console.log(`movePosCheck: ${movePosCheck}.`);
      return nextPos;
   } 
   
   
   else if(pos < movePos){//+
      if(movePosCheck < posCheck){
         nextPosArray = arrayForMoving(pos, movePos);
         nextPos -= nextPosArray.pop();
         
      } else {
         nextPosArray = arrayForMoving(pos, movePos);
         nextPos += nextPosArray.pop();
         
      }
         

         
      

      landArray[nextPos][1] = name;
      document.getElementById(nextPos).innerHTML = face;
      // console.log(`posCheck: ${posCheck}`);
      // console.log(`movePosCheck: ${movePosCheck}.`);
      
      return nextPos;
   }

}


var getNth = (a) =>{
if(a.length == 2){
   a = parseInt(a[1])
   return a;
} 
else {
   a = parseInt(a[0])
   return a;
}
}


//algorithm that decides the next place, creates new array and then fills it with the next coordinates
// need to get the number to move along the line correctly then plus ten.
// THIS FILLS AN ARRAY FULL OF 10s AND 1s AND THEN EACH TIME IT POPS OUT EITHER 10 OR 1. NEXT POSITION USES THIS.
var arrayForMoving = (p, mp) => {

   let numbersForArray = p - mp;

   let newNextPosArray = []; // always creates new array, so no infinite + or - 10;

   if(numbersForArray < 0){ //if negative make positive

      numbersForArray = Math.abs(numbersForArray)
   }

   numbersForArray = numbersForArray.toString();

   if(numbersForArray.length === 1){ // if only one digit 

      let nth = parseInt(numbersForArray[0]);
      for(let i = 0; i < nth; i++){

         newNextPosArray.push(1);
      }
     
      return newNextPosArray;
   } 
   
   else { // else if double digit

      let tenth = parseInt(numbersForArray[0]);

      let nth = parseInt(numbersForArray[1]);

      for(let i = 0; i < tenth; i++){

         newNextPosArray.push(10)
      }
      for(let j = 0; j < nth; j++){

         newNextPosArray.push(1);
      }

      return newNextPosArray;
   }
}



//NEED TO MAKE IT SO THAT ANIMASLS CAN'T OCCUPY THE SAME CELL AAS OTHER ANIMALS OR WATER/ PLANTS.
//MAIN moving METHOD
var moving = (arr) => {
   arr.forEach((value) =>{ //foreach indexed value.
      thirst(value);
      
      eatBush(value);
      
      
      // console.log(`animal: ${value.name}. Thirst: ${value.thirst}. Hunger ${value.hunger}`)
      // let occupied
      if(value.position !== value.movingToPos){ // if pos and movingtopos are not equal AND&& is not occupied then move
         value.position = moveCalculate(value.position, value.movingToPos, value.face, value.name);

      } 
      else if(value.position === value.movingToPos) {
        return value.movingToPos = random(); // if pos and movingToPos are equal AND&& movingToPos is occupied then choose another random one
      }

   })
}

//------------------------------------------------------ANIMAL BEHAVIOR

var thirst = (arr) => {
   

   if(arr.thirst > 20){
      let randomDrain = randomTen();
      return arr.thirst -= randomDrain;
   }
   if(arr.position === newWaterPopulation[0].position){
      arr.thirst = 100;
      return arr.movingToPos = random();
   }
   if(arr.thirst <= 20){
      
      return arr.movingToPos = newWaterPopulation[0].position;
   }
     
}

// function for eating

var eatBush = (arr) => {
   
   if(arr.name == "deer"){
      if(arr.hunger > 20){
         let randomDrain = randomTen();
         return arr.hunger -= randomDrain;
      }
      if(arr.position === newBushPopulation[0].position){ 
         newBushPopulation.shift();
         arr.hunger = 100;
         return arr.movingToPos = random();
      }
      if(arr.hunger <= 20 && newBushPopulation.length == 0){
         newDeerPopulation.shift();
      }
      if(arr.hunger <= 20){
         
         return arr.movingToPos = newBushPopulation[0].position;
      }
      
   }                                
   else if(arr.name == "lion"){
      if(arr.hunger <= 20 && newDeerPopulation.length === 0){
         lionPopulation.shift();
      }
      if(arr.hunger > 20){
         let randomDrain = randomTen();
         return arr.hunger -= randomDrain;
      }
      if(arr.position === newDeerPopulation[0].position){
         newDeerPopulation.shift();
         arr.hunger = 100;
         return arr.movingToPos = random();
      }
      if(arr.hunger <= 20 && newDeerPopulation.length == 0){
         newLionPopulation.shift();
      }
      if(arr.hunger <= 20){
         console.log(`LION IS HUNTIN#######################`)
         return arr.movingToPos = newDeerPopulation[0].position;
      }
      
      
   }
   
}


//-------------------------------------------------------------keep bushes and water there

var bushAndWaterUpdate = (arr) => {
   for(let i = 0; i <arr.length; i++){
      document.getElementById(arr[i].position).innerHTML = arr[i].face;
   }
  
}

//-------------------------------------------------------RESET

//---------------------------------------------------------GAME TIMER
var timeout; // clear timeout
var Timer = 0;

function gameTimer(){ 
    
    timeout = setTimeout(function(){ 
      Timer++; 


      if(Timer % 60 == 0){
         // spawn new deers and bushes
         newNewBushPopulation = bushPopulation.map(obj => ({...obj, position : random()}))
         newNewBushPopulation.forEach((value) => {// NEW
         landArray[value.position][1] = value.name; 
         })
         spawnAnimals(newNewBushPopulation);
         let bushLen = newNewBushPopulation.length;
         for(let i = 0; i < bushLen; i++){           //bushLen was length variable instead.
            let newBush = newNewBushPopulation.pop();
            newBushPopulation.unshift(newBush);
         }
         //---------------------------------
         newNewDeerPopulation = deerPopulation.map(obj => ({...obj, position : random(), face : "🦌", movingToPos: random(), name: "deer"})); // NEW
         newNewDeerPopulation.forEach((value) => {// NEW
            landArray[value.position][1] = value.name; 
         })
         spawnAnimals(newNewDeerPopulation)
         console.log("ADDING NEW DEEEEER")
         let len = newNewDeerPopulation.length;
         for(let i = 0; i < len; i++){
            let newDeer = newNewDeerPopulation.pop()
            newDeerPopulation.unshift(newDeer)
         }
        
      }


      occupiedLand_Update();
      bushAndWaterUpdate(newWaterPopulation);
      bushAndWaterUpdate(newBushPopulation)
      
      moving(newDeerPopulation);
      moving(newLionPopulation);
      
      
       
      
      // console.log('##############################################################');
      // console.log(`the current location: ${newLionPopulation[0].position}.`); 
      // console.log(`The lion is moving to: ${newLionPopulation[0].movingToPos}.`);
      console.log(`Timer: ${Timer}`);
      // console.log('##############################################################');
      if(Timer < 240){gameTimer();}            
    }, 500) 
}   















































//CODE FOR REFERENCE

//var p = document.createElement("p");
// btnGenerate.replaceWith(p)
//wrapperId.appendChild(divTag)

// creating multi dimensional array for land reference. [a][b] a === index of the whole number, b == index of second digit of whole nnumber
// example landArray[90] == 9,0 SO... landArray[90][0] == 9 //// landArray[90][1] == 0
//NO NEED FOR MULTI INT DIMENSIONS
// var landArray_Generation = () => {
//    for(var i = 0; i < 10; i++){
//       for(var j = 0; j < 10;j++){
//          landArray.push([i, j])
//       }
//   }
// }





//RANDOM PLACEMENT OF ANIMALS
//   for(let i = 0; i < newLionPopulation.length;i++){
//       document.getElementById(newLionPopulation[i].position).innerHTML = newLionPopulation[i].face;
//   }
