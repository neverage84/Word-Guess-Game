window.onload = function(){
    var TopArr = ["Q","W","E","R","T","Y","U","I","O","P"];
    var MidArr = ["A","S","D","F","G","H","J","K","L"];
    var LowArr = ["Z","X","C","V","B","N","M"];
    var EmptyArr = [];
    var WordArr = ["PRINCESS", "MALEFICENT", "CINDERELLA", "JASMINE", "DALMATIONS", "JAFAR", "SIMBA"];
    var Guesses = 16;
    var Wins = 0;
    var Losses = 0;
    var SelectedWord = "";
    var Count = 1;
    var key = "";
    var WordNumber = 0;
    
   
    function ButtonClickSound() {
           var sound = document.getElementById("click");
           sound.play();
       };
   function WinGameSound() {
           var sound = document.getElementById("win");
           sound.play();
       };
   function LoseGameSound() {
           var sound = document.getElementById("lose");
           sound.play();
       };
    
   //function to randomly generate Word//
   function WordGenerator () {
       EmptyArr = [];
       SelectedWord = WordArr[WordNumber];
       for (i = 0; i < SelectedWord.length; i++) {
           EmptyArr[i] = '_';
       }
       document.getElementById("underscores").innerHTML = EmptyArr.join(" ");
          
   }
   //Compare button to word selected
   function CompareWord(str) {
       
       for (var i = 0; i < str.length; i++){
           if (key.indexOf(str[i]) !== -1) {
               EmptyArr[i] = str[i];
               document.getElementById("underscores").innerHTML = EmptyArr.join(" ");
           }
          
       }
       
   }
   //Reset function
   function Reset() {
       if (WordNumber < 6) {
       Guesses = 15;
       WordNumber++;
       WordGenerator();
       
       document.getElementById("GuessesLeft").innerHTML = "Guesses Left: " + Guesses + "<br>" + "Wins: " + Wins + "<br>" + "Losses: " + Losses;    
       }
       else {
           NewGame();
       }
   }
//Reset the whole game//

   function NewGame(){
    
    alert("Click any button to restart game");

    EmptyArr = [];
    Guesses = 16;
    Wins = 0;
    Losses = 0;
    SelectedWord = "";
    Count = 1;
    key = "";
    WordNumber = 0;
    WordGenerator();  
   }
   //Buttons back to green buttons on next words.
   function GreenButtons (){
       for (var i = 0; i < 27; i++) {
           document.getElementsByClassName("letter-btn")[i].style.backgroundColor = "lightgreen";
       }
   }
   //Create the buttons to  press//
    
    for (var i = 0;  i < TopArr.length; i++){
        var Btn = document.createElement("BUTTON");
        Btn.setAttribute("btnData",TopArr[i]);
        Btn.classList.add("letter-btn");
        Btn.innerHTML = TopArr[i];
        document.getElementById("TopRow").appendChild(Btn);
    }
    for (var i = 0;  i < MidArr.length; i++){
        var Btn = document.createElement("BUTTON");
        Btn.setAttribute("btnData",MidArr[i]);
        Btn.classList.add("letter-btn");
        Btn.innerHTML = MidArr[i];
        document.getElementById("MidRow").appendChild(Btn);
    }
    for (var i = 0;  i < LowArr.length; i++){
        var Btn = document.createElement("BUTTON");
        Btn.setAttribute("btnData",LowArr[i]);
        Btn.innerHTML = LowArr[i];
        Btn.classList.add("letter-btn");
        document.getElementById("LowRow").appendChild(Btn);
    }
    var letterButtons = Array.from(document.querySelectorAll(".letter-btn"));
    
    letterButtons.forEach(function(btn){
        
       btn.addEventListener("click", function(){
           if (Count === 1) {
           WordGenerator(); // < -- I don't think this is correct
            // console.log(btn.getAttribute("btnData"));
            
            Count = 0;
            Guesses -= 1;
            document.getElementById("GuessesLeft").innerHTML = "Guesses Left: " + Guesses + "<br>" + "Wins: " + Wins + "<br>" + "Losses: " + Losses;
           
           }
           else {
               this.style.backgroundColor = "pink";
               key = btn.getAttribute("btnData");
               CompareWord(SelectedWord);
               Guesses--;
               document.getElementById("GuessesLeft").innerHTML = "Guesses Left: " + Guesses + "<br>" + "Wins: " + Wins + "<br>" + "Losses: " + Losses;
               var WinScenario = EmptyArr.includes("_");
               ButtonClickSound();
               
               if (WinScenario===false){
                   Wins++;
                   WinGameSound();
                   Reset();
                   GreenButtons();
               }
               else if (WinScenario===true && Guesses===0){
                   Losses++;
                   LoseGameSound();
                   Reset();
                   GreenButtons();
               }
           }
            
   
            
        });
    });
   }