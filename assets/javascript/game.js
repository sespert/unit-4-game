$(document).ready(function() {
    //Global Variables
    //Random number to be matched, counters for wins, looses and user choices, and 
    //array of values of the 4 crystals    
    var randomNumber = 19 + (Math.floor(Math.random() * 102));
    var wins = 0;
    var looses = 0; 
    var userCounter = 0;
    var crystalValue = [];
    
    //Send to the DOM the computer number
    $("#randomNum").text(randomNumber);

    //Populate the array of crystal values randomly with numbers between 1 and 12
    function generateCrystValues() {
        function returnRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
    
        for (i=0;i<4;i++){
            var numberInArray = false;
            var rand = returnRandomNumber(1,12);
            for (j=0;j<crystalValue.length;j++){
                if(rand === crystalValue[j]) {
                    numberInArray = true;
                    i--;
                }
            }
            if(!numberInArray) {
                crystalValue.push(rand);
            }
        }
   };

   //Assign a value to each crystal
    function imageValues() {
        $(".card-img-top").each(function(index) {
        $(this).attr("value-crystal", crystalValue[index]);
        });
    };

    //Send to the DOM the counters
    $("#wins").text("Wins: " + wins);
    $("#looses").text("Looses: " + looses);
    $("#score").text(userCounter);

    //Reset the counters and choose another random variables
    function resetStats() {
        randomNumber = 19 + (Math.floor(Math.random() * 102));
        $("#randomNum").text(randomNumber);
        userCounter = 0;
        $("#score").text(userCounter);
        crystalValue = [];
    };

    //When user win, update win counter and reset stas
    function userWin() {
        wins++;
        $("#result").text("You win!!!");
        $("#wins").text("Wins: " + wins);
        resetStats();
    };

    //When user looses, update looses counter and reset stats
    function userLost() {
        looses++;
        $("#result").text("You lost!!!");
        $("#looses").text("Looses: " + looses);
        resetStats();
    }
    
    //Call the functions to generate and assign values to the crystals
    generateCrystValues(); 
    imageValues();

    //When user clicks an image, update the user counter and add the values to try to match the 
    //computer randomly generated number
    $(".card-img-top").on("click", function() {
        var userData = $(this).attr("value-crystal");
        userCounter += parseInt(userData);
        $("#score").text(userCounter);
        
        if(userCounter===randomNumber) {
            userWin();
            generateCrystValues(); 
            imageValues();

        } else if (userCounter>randomNumber) {
            userLost();
            generateCrystValues(); 
            imageValues();
        
        } 
    });
});


