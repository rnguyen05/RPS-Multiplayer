/*Things need to do
1. get player1, player2 keys from database
2. when player leave the game, show player discontinued... in chat session
3. Browser refreshed, wipe correct player in the database
4. Display (player nane, choose options and score in the button)
5. 
*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBNJs8Us8Wwv7AsBsQPAej65ND_USTe24I",
    authDomain: "rockpaperscissors-project.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-project.firebaseio.com",
    projectId: "rockpaperscissors-project",
    storageBucket: "",
    messagingSenderId: "742478299547"
};
firebase.initializeApp(config);

//Initial global variables
var playerCount = 0;
var losses = 0;
var wins = 0;
var playerOne;
var PlayerTwo; 
var numPlayers;

//Database variable
var playerRef = firebase.database().ref();

//displayPlayer function
function displayPlayer () {
    $("#displayForm").html("");
    if (numPlayers === 1) {
        $(".playerOneName").text(playerName).css("font-weight","bold");
        $("#playerId, .playerOneScores").css("display","block");
        $(".rock1, .paper1, .scissors1").css("display","inline");
        playerOne = playerName;
        $("#playerId").html("<p>Hi " + playerName +"! You are Player " + numPlayers + "</p>");
    }
    else if (numPlayers === 2) {
        $(".playerTwoName").text(playerName).css("font-weight","bold");
        $("#playerId, .playerTwoScores").css("display","block");
        $(".rock2, .paper2, .scissors2").css("display","inline");
        playerTwo = playerName;
        $("#playerId").html("<p>Hi " + playerName +"! You are Player " + numPlayers + "</p>");
    }

    //If there are two players then display player name on opponent side
    if (numPlayers === 2) {
        $("playerTwoName").text(playerTwo);
    }
}

//Get number of players in database
playerRef.child("players").on("value", function (snapshot) {
    
    console.log(snapshot.val());
    numPlayers = snapshot.numChildren();
});


//saveGameInfo Function
function saveGameInfo (playerName, losses, wins) {
    var newPlayerRef = playerRef.child("players");
    //Populate Players
    newPlayerRef.push().set ({
        playerName: playerName,
        losses: losses,
        wins: wins
    });

    //Call display player name and game info
    //Display first player name 
    displayPlayer();
    //displayPlayerName();
}

//Submit form 
function submitForm () {
    playerName = $("#playerName").val().trim();
    //Save Game Info
    saveGameInfo(playerName, losses, wins);
}

//Listen for form submit
$("#displayForm").on('click','.btn-sbPlayer', function (e) {
    e.preventDefault();
    //Prevent more than two players enter the game at the same time
    if (numPlayers <= 1) {
        //Call submit form 
        submitForm();
    }
    else {
        alert("Two players are playing. Please wait!!!");
    }  
});


