var timerClock;
var timeLeft = 300;
var timerOn = false;
var t1Score = 0;
var t2Score = 0;
var formattedTimer = "5:00"
var currentRound = 1;
var roundTimeMax = 300;
var breakTimeMax = 45;
var timeoutTimeMax = 45;
console.log("loaded js");

var isGameOver = false;
function newRound() { //handler for the end of the round ( t = 0 or endround pressed)
  pauseClock();
  timerOn = false;
  currentRound += 1;
  var roundStatus = document.getElementById("roundStatus");

  if (currentRound < 3) {
    document.getElementById("stopButton").textContent = "End Round"; 
    roundStatus.textContent = "Round " + currentRound;
    timeLeft = roundTimeMax;
    startPauseButton.textContent = "Start";
    updateTime();
    if (isGameOver) {
      newEvent("Restart!")
      isGameOver = false;
      t1Score = 0;
      t2Score = 0;
      updateScores();
    }
    else {
      newEvent("End of Round!");
    }  
  }
  else {
    roundStatus.textContent = "Game over!"
    document.getElementById("stopButton").textContent = "Restart";
    console.log(stopButton)
    newEvent("Game over!");
    isGameOver = true;
    currentRound = 0
  }
}
function timerFunction() { //main timer clock function call
  if (timeLeft <= 0) {
    newRound();
  }
  else {
    timerClock = setTimeout(timerFunction,1000)
    console.log(timeLeft -= 1);
    updateTime();
    
  } 
}
function updateTime() {
  formattedTimer = Math.floor(timeLeft/60) + ":"
    if (timeLeft % 60 < 10) {
      console.log("less");
      formattedTimer += "0" + (timeLeft % 60).toString();
    }
    else {
      formattedTimer += timeLeft % 60
    }

    document.getElementById('timerText').textContent = formattedTimer
}
startPauseButton.addEventListener("mouseup", function(event) {
    console.log("startstop");
    timerOn = !timerOn;
    if (timerOn) {
      startClock();
      this.textContent = "Pause"
    }
    else {
      pauseClock();
      this.textContent = "Start"
    }
});

stopButton.addEventListener("mouseup", function(event) {
  newRound();
});

function startClock() { //main timer clock start
  timerClock = window.setTimeout(timerFunction,1000);
}

function pauseClock() { //main timer clock pause
  clearInterval(timerClock);
}

function newEvent(event) { //register a new event place in the log
  var eventlog = document.getElementById('eventlog');
  console.log(eventlog.rows.length);
  var newRow = eventlog.insertRow(0); //new row at top
  var cell1 = newRow.insertCell(0); //event
  var cell2 = newRow.insertCell(1); //time
  cell1.classList.add("mdl-data-table__cell--non-numeric"); //css to left align
  cell1.innerHTML = event;
  cell2.innerHTML = formattedTimer;
  console.log(event);
}

//Scores

function updateScores() { //formats the view for scores
  document.getElementById('scoreBoard').textContent = t1Score + ":" + t2Score
}

addTOneScore.addEventListener("mouseup", function(event) {
  console.log("t1+");
  t1Score += 1;
  updateScores();
  newEvent("Goal for team 1");
});

minusTOneScore.addEventListener("mouseup", function(event) {
  console.log("t1-");
  t1Score -= 1;
  updateScores();
  newEvent("-1 Point to team 1");
});

addTTwoScore.addEventListener("mouseup", function(event) {
  console.log("t2+");
  t2Score += 1;
  updateScores();
  newEvent("Goal for team 2");
});

minusTTwoScore.addEventListener("mouseup", function(event) {
  console.log("t2-");
  t2Score -= 1;
  updateScores();
  newEvent("-1 Point to team 2");
});

//Timeouts/Damaged
function botTimeout() {
  this.textContent -= 1 //storing the data in a DOM for convenience sake
  time = parseInt(this.textContent)
  if (time > 0) { //If not done
    window.setTimeout(botTimeout.bind(this),1000);
    if (time < 10) {
      if (time % 2) {
        this.classList.add("mdl-button--colored-red-500");
        this.classList.add("mdl-button--colored");
      }
      else {
        this.classList.remove("mdl-button--colored-red-500");
        this.classList.remove("mdl-button--colored");
      }
    }
  }
  else { //Once finished
    this.textContent = 0
    this.classList.remove("mdl-button--colored-red-500");
    this.classList.remove("mdl-button--colored");
    // you know you're tired and it's late when you start making hacks instead of generalisable code
    if (this.id == "tOneTimeoutOne") { 
      t1Bot1On = false;
      newEvent("Team 1 Bot 1 back on!");
    }
    else if (this.id == "tOneTimeoutTwo") {
      t1Bot2On = false;
      newEvent("Team 1 Bot 2 back on!");
    }
    else if (this.id == "tTwoTimeoutOne") {
      t2Bot1On = false;
      newEvent("Team 2 Bot 1 back on!");
    }
    else if (this.id == "tTwoTimeoutTwo") {
      t2Bot2On = false;
      newEvent("Team 2 Bot 2 back on!");
    }
    
  }
}
var t1Bot1On = false;
var t1Bot2On = false;
var t2Bot1On = false;
var t2Bot2On = false;
//hacky globals, it's late, i'm tired, and i want this done >:(

tOneTimeoutOne.addEventListener("mouseup", function(event) {
  if (t1Bot1On == true) {
    t1Bot1On = false;
    this.textContent = 0
  }
  else {
    t1Bot1On = true;
    this.textContent = timeoutTimeMax;
    console.log("t11out");
    newEvent("Team 1 Bot 1 damaged!");
    window.setTimeout(botTimeout.bind(this),1000);
  }
});

tOneTimeoutTwo.addEventListener("mouseup", function(event) {
  if (t1Bot2On == true) {
    t1Bot2On = false;
    this.textContent = 0
  }
  else {
    t1Bot2On = true;
    this.textContent = timeoutTimeMax;
    newEvent("Team 1 Bot 2 damaged!");
    window.setTimeout(botTimeout.bind(this),100);
  }
});

tTwoTimeoutOne.addEventListener("mouseup", function(event) {
  if (t2Bot1On == true) {
    t2Bot1On = false;
    this.textContent = 0
  }
  else {
    t2Bot1On = true;
    this.textContent = timeoutTimeMax;
    newEvent("Team 2 Bot 1 damaged!");
    window.setTimeout(botTimeout.bind(this),1000);
  }
});

tTwoTimeoutTwo.addEventListener("mouseup", function(event) {
  if (t2Bot2On == true) {
    t2Bot2On = false;
    this.textContent = 0
  }
  else {
    t2Bot2On = true;
    this.textContent = timeoutTimeMax;
    newEvent("Team 2 Bot 2 damaged!");
    window.setTimeout(botTimeout.bind(this),1000);
  }
});

//settings

settingsSave.addEventListener("mouseup", function(event) {
  console.log("hi!")
  console.log(team1NameIn.value)
  console.log(team2NameIn.value)
  console.log(roundTimeIn.value)
  console.log(timeoutTimeIn.value)
  console.log(breakTimeIn.value)
  document.getElementById("team1Name").innerText = team1NameIn.value
  document.getElementById("team2Name").innerText = team2NameIn.value
  breakTimeMax=  breakTimeIn.value
  timeoutTimeMax = timeoutTimeIn.value
  roundTimeMax = roundTimeIn.value
  timeLeft = roundTimeMax
  updateTime();
});
