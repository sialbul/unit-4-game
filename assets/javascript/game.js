	// Global variables
	var baseAttack = 0; // original attack strength
	var player; // holds the player Object
	var defender; // holds the current defender Object
	var charArray = []; // array that stores the game characters (Objects)
	var playerSelected = false; // flag to mark if we picked a player yet
	var defenderSelected = false; // flag to mark if we picked a defender

	// Constructor
	function character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;}

	// Initialize all the characters
	function initCharacters() {
    var luke = new character("Luke Skywalker", 100, 10, 5, "./assets/images/luke.jpg");
    var vader = new character("Darth Vader", 200, 50, 30, "./assets/images/vader.jpg");
    var obi = new character("Obi-Wan Kenobi", 150, 15, 2, "./assets/images/obi.jpg");
    var chew = new character("Chewbacca", 180, 30, 12, "./assets/images/chew.jpg");
    charArray.push(luke, vader, obi, chew);}

	function reset() {
	window.gameObj = {
	attackOccurred: false,
	winOccurred: false,
	lossOccurred: false,
	wounded: false,
	gameOver: false,
	jediMaster: false,
	characterArrayList: [
	
	// 1.  An array or object of possible characters properties would include 
	// name, picture, Health Points, Attack Power and counter attack power
	    {
	        name: 'Luke SkyWalker',
	        visual: 'assets/images/luke.jpg',
	        healthPoints: 160, 
	        attackPower: 13,
	        counterAttackPower: 20,
	    },
	    {
	        name: 'Yoda',
	        visual: 'assets/images/yoda.jpg', 
	        healthPoints: 150,
	        attackPower: 10,
	        counterAttackPower: 30,
	    },
	    {
	        name: 'Leia',
	        visual: 'assets/images/leia.jpg',
	        healthPoints: 130, 
	        attackPower: 7,
	        counterAttackPower: 15,
	    },
	    {
	        name: 'Darth Vader',
	        visual: 'assets/images/darth.jpg',
	        healthPoints: 180,
	        attackPower: 15,
	        counterAttackPower: 25,
		}],
		
	// Initializes game start true
	gameStart: true,
	// initializes your character to nothing
	yourCharacter: null,
	// initializes enemy selection to nothing
	currentEnemy: null,
	// initializs your blank array of previously fought enemies. might just remove all together
	previouslyFought: [],
	// sets current attack power to null
	yourCurrentAttackPower: null,
	winOccurred: false,
	}
	};
	// Increase the attack strength (this attack strength + original attack strength)
	character.prototype.increaseAttack = function () {
    this.attackPower += baseAttack;
	};

	// Performs an attack
	character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    $("#msg").html("You attacked " +
        Obj.name + "for " + this.attackPower + " damage points.");
    this.increaseAttack();
	};

	// Performs a counter attack
	character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
    $("#msg").append("<br>" + this.name + " counter attacked you for " + this.counterAttackPower + " damage points.");
	};
	// STAGE 1: Initial Setup/ Display
	$(document).ready(function() {
	reset();
	
	// displays the modal
  	$('#myModal').modal('show');
		function render() {
		var $charList = $('#characterList');
		var $enemyList = $('#enemyList');
		var $yourCharacter = $('#yourCharacter');
		var $attackText = $('#attackText');
		var $yourEnemy = $('#yourEnemy');
		var $winText = $('#attackText');
		var $lossText = $('#attackText');
		var $gameOver = $('#gameOver');
		var $jediText = $('#attackText');
		var $selectYour = $('#selectYour');
		var $enemiesAttack = $('#enemiesAttack');

		
	// using underscore.js to create templates that are dynamically updated
		var $charTemplate = _.template($('#characterTmpl').html());
		var $attackTemplate = _.template($('#attackTmpl').html());
		var $winTemplate = _.template($('#winTmpl').html());
		var $lossTemplate = _.template($('#lossTmpl').html());
		var $jediTemplate = _.template($('#jediTmpl').html());
		
	// Haven't selected Character
		var charHtml = "";
		$yourCharacter.html("");
		$yourEnemy.html("");
		$attackText.html("");
		$gameOver.html("");
		
	// using a ternary operator to give true or false to the background color choice
		var listBg = gameObj.yourCharacter ? "bg-black" : "bg-white";
		
	// Sets the initial screen with characters to select from
		gameObj.characterArrayList.forEach(function(character, index) {
		charHtml = charHtml + $charTemplate({index: index, background: listBg, character: character});
		});
		if (gameObj.yourCharacter) {
			$yourCharacter.html($charTemplate({index: 0, background: 'bg-white', character: gameObj.yourCharacter}));
			
	// re-write in jQuery
			$enemyList.html(charHtml);
			$charList.html("");
		} else {
			$charList.html(charHtml);
			$enemyList.html("");
		}
		if (gameObj.currentEnemy) {
			$yourEnemy.html($charTemplate({index: 0, background: 'bg-red', character: gameObj.currentEnemy}));
		}
		if (gameObj.attackOccurred) {
			$attackText.html($attackTemplate({gameObj: gameObj}));
		}

	// added
		if (gameObj.winOccurred) {
		
	// Displays the win text 
		$winText.html($winTemplate({lastOpponent: gameObj.lastOpponent}));
	
	// Removes the enemy character after you win.
		$('#yourEnemy').empty(gameObj.currentEnemy);
		}
		
	// NOT WORKING
		if (gameObj.attackOccurred = false) {
			$('#attackText').html("No enemy to fight, select an enemy");
	//If user continues to press attack button it displays the text "No enemy to fight, select an enemy."
		}

		if (gameObj.lossOccurred) {
	// Displays loss text
			$lossText.html($lossTemplate({gameObj: gameObj}));
		}
		
	// This runs when the enemy is wounded (hp less than zero)
		if (gameObj.wounded){
			$('#attackText').html("You are seriously wounded. GAME OVER!");
		}
		
	// This runs if the user losses
		if (gameObj.gameOver) {
			
	// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();
			b.click(render);
			$('#gameOver').append(b);
		}
		
		if (gameObj.jediMaster) {
	// Displays final text 
			$jediText.html($jediTemplate({lastOpponent: gameObj.lastOpponent}));
			$('#yourEnemy').empty(gameObj.currentEnemy);
		
	// creates the reset button to start the game over
			var b = $('<button>');
			b.addClass('btn-primary waves-effect waves-light btn-lg');
			b.html('Battle Again!');
			reset();
			b.click(render);
			$('#gameOver').append(b);
			}
		}
		
    //STAGE 2: Selecting your character 
    	$('#characterList').on('click', '.characterContainer', function(e) {
		
	// references the characterList
    	var element = $(this);
    	var charIndex = element.data('character-index');
		$("#selectYour").empty();

	// your character was initially set as null so when your character != null this if runs
    	if (!gameObj.yourCharacter) {
			
	// pushes your object selection into yourCharacter array
    	gameObj.yourCharacter = gameObj.characterArrayList.splice(charIndex, 1)[0];
		
	// setting initial attack power to the value within the master object
		gameObj.yourCurrentAttackPower = gameObj.yourCharacter.attackPower;
		
    	}   
    // This renders and updates all of the html elements 
    	render();
    	});
	//player selected ??????not working
		if (characterList===true){
		$("#enemiesAttack").text("Selecet Your Enemy");}

	// STAGE 3: select your enemy
	   	$('#enemyList').on('click', '.characterContainer', function(e) {
    	var element = $(this);
    	var charIndex = element.data('character-index');
		
	// current enemy was initially set as null so when your enemy != this if runs 
		if (!gameObj.currentEnemy) {
		
	// creates an array that houses the enemy character
		gameObj.winOccurred = false;
		
	// sets the attack button to false ensuring the attack text is not displayed when selecting a new character and only after 
	// ...click attack
		gameObj.attackOccurred = false;
    	gameObj.currentEnemy = gameObj.characterArrayList.splice(charIndex, 1)[0];
    	}
		
	// This renders and updates all of the html elements 
    	render();
    	    	
   		 });
	
	// STAGE 4: GAME PLAY. Click on ATTACK
    	$('#attackBtn').on('click', function(e) {
		
	// this ensure you cannot click any other characters again
    	if (!gameObj.yourCharacter || !gameObj.currentEnemy) {
		$('#attackText').html('No enemy here, select an enemy to fight.')
		return;
    	}

    	gameObj.attackOccurred = true;
    	
    // declaring new variables
    	var yourCharacter = gameObj.yourCharacter;
    	var currentEnemy = gameObj.currentEnemy;
		
	//increment yourAttackPower by yourCharacter.attackPower
    	gameObj.yourCurrentAttackPower  = gameObj.yourCurrentAttackPower + yourCharacter.attackPower;
		
	//decrease enemy health points by yourAttackPower state
    	currentEnemy.healthPoints = currentEnemy.healthPoints - gameObj.yourCurrentAttackPower; 
		
	//decrease your health points by enemy's counterAttackPower
    	yourCharacter.healthPoints = yourCharacter.healthPoints - currentEnemy.counterAttackPower;
    	console.log ("enenemy health points: " + currentEnemy.healthPoints + ' your health: ' + yourCharacter.healthPoints);
       
    	
    // Win scenario
    // set win variable  and loss in order to consolidate win ifs. 
    	var win = 	(currentEnemy.healthPoints < 1 && yourCharacter.healthPoints > 1 || 
    				((yourCharacter.healthPoints < 1 && currentEnemy.healthPoints < 1) && 
    				(yourCharacter.healthPoints > currentEnemy.healthPoints))
    			  	) ? true : false;
    	var loss = 	(yourCharacter.healthPoints < 0 && currentEnemy.healthPoints > 0 || 
    				((yourCharacter.healthPoints < 0 && currentEnemy.healthPoints < 0) && 
    				(yourCharacter.healthPoints < currentEnemy.healthPoints))
    			  	) ? true: false;
    
    // First if is only if user has defeated all of the enemies    	
    	if (win) { 
    	console.log('healthPoints of enemy should be equal great than or eqaul to 0: ' + currentEnemy.healthPoints);
		if (gameObj.characterArrayList.length > 0){
		console.log(gameObj.characterArrayList.length);
		gameObj.winOccurred = true;
				
	// need to be able to select another enemy
		gameObj.lastOpponent = gameObj.currentEnemy;
		gameObj.currentEnemy = null;
		}  
		
	// scenario when you have defeated all characters
		else if (gameObj.characterArrayList.length == 0){
		console.log('Final Jedi Portion ' + gameObj.characterArrayList.length);
		gameObj.lastOpponent = gameObj.currentEnemy;
		gameObj.attackOccurred = false; 
		gameObj.jediMaster = true;
		}  }

     // Loss Scenario
    	else if (loss) {
    	gameObj.lossOccurred = true;
    	console.log('Entered the loss occurred section');
    	gameObj.attackOccurred = false; 
    	gameObj.gameOver = true; 
    	}
    	render();
    });
			
    render();
});