window.onload = function() {          //when window loads runs function without name.
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = true;
  checkSavedTime();
};

//global variables//
var timerInterval;
var timeLeftOnExit;
var globalTime;
var shouldBePaused;
var show = false;
var work,fun,longFun;
//***************//

//Countdown Code Starts*********************************************************************************************************************************************************************************************************************
function startTimer(passedId, passedTime) {
  globalTime = passedTime;
  timerInterval = setInterval(function(){      //created interval that keeps running every 1000 milisecond


      var clock = document.getElementById(passedId);


        var timer = updateTimer();

        //if(daysOn) {
          clock.innerHTML = "<span>" + timer.minutes + "</span>"     //span[0]
                          + "<span>" + timer.seconds + "</span>";    //span[1]
          var spans = clock.getElementsByTagName("span");
          animateClock(spans[1]); //animates seconds every second
          if(timer.seconds == 59) animateClock(spans[0]);
            var spans = clock.getElementsByTagName("span");

          if(timer.total < 1){            //if statement check
            clearInterval(timerInterval); // if true clears interval we created earlier
            clock.innerHTML = "<span>0</span><span>0</span>"; //then sets everything to zero
          }

          if(shouldBePaused == true)
            clearInterval(timerInterval);

  }, 1000);   //end of interval but keeps going every 1000 miliseconds
}    //out of interval no more code to run.

function updateTimer() {
  var time = globalTime = globalTime - 1000;  //provided time minus current time equals time left.
  saveTime();

  return {
    "days": Math.floor( time/(1000*60*60*24) ),     //checks how many days are in provide miliseconds
    "hours": Math.floor( (time/(1000*60*60)) % 24 ),//checks hours in provided miliseconds
    "minutes": Math.floor( (time/1000/60) % 60 ),   //checks minutes in provided milliseconds
    "seconds": Math.floor( (time/1000) % 60 ),      //checks seconds in provided milliseconds
    "total" : time
  };
}

function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}
//Countdown Code Ends***********************************************************************************************************************************************************************************************************************



//Set,Resume,Pause, Code Starts********************************************************************************************************************************************************************************************************
function set() {
  clearInterval(timerInterval);
  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;
  localStorage.userPauseStateClassic = true;
  shouldBePaused = true;

  var minutes = work;
  minutes = parseInt(minutes);
  minutes = minutes*60000;

  var seconds = 01;
  seconds = parseInt(seconds);
  seconds = seconds*1000;

  globalTime = (minutes+seconds);


  startTimer("clock", globalTime);
}

function resume() {
  clearInterval(timerInterval);
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = false;
  localStorage.userPauseStateClassic = false;
  shouldBePaused = false;

startTimer("clock", globalTime);
}

function pause() {

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;
  localStorage.userPauseStateClassic = true;
  clearInterval(timerInterval);
}
//Set,Resume,Pause, Code Ends**********************************************************************************************************************************************************************************************************



//Save Name/Timer Code Starts*******************************************************************************************************************************************************************************************************

function saveTime() {
  localStorage.userTimeLeftClassic = globalTime;
  localStorage.userDateOfExitClassic = new Date();
}

function checkSavedTime(){
  if(localStorage.userTimeLeftClassic!=null) {
      var timeLeft = localStorage.userTimeLeftClassic;
      timeLeft = parseInt(timeLeft);
      var pauseState = localStorage.userPauseStateClassic;

      if(pauseState == "true")
        pauseState = true;
      else if(pauseState == "false")
        pauseState = false;


      if(pauseState) {
        document.getElementById("resume").disabled = false;
        document.getElementById("pause").disabled = true;

        shouldBePaused = true;
        timeLeft = timeLeft + 1000;
        startTimer("clock",timeLeft);
      }
      else {
        var dateOfExit = new Date(localStorage.userDateOfExitClassic);
        dateOfExit = dateOfExit.getTime();

        var dateOfReturn = new Date();
        dateOfReturn = dateOfReturn.getTime();

        var timeElapsed = dateOfReturn - dateOfExit;
        document.getElementById("resume").disabled = true;
        document.getElementById("pause").disabled = false;
        localStorage.userPauseStateClassic = false;

        var newTime = timeLeft - timeElapsed;

        startTimer("clock", newTime);
      }
  }
}


//Save Name/Timer Code Ends******************************************************************************************************************************************************************************************************



//Clock Modification Code Starts **********************************************************************************
function startStop() {
  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;
  sliderTampered = true;
  shouldBePaused = true;
  set();
}

function settings() {
  if(show == true) {
  document.getElementById("settings").style.display = "inline";
  show = false;
  }
  else{
    document.getElementById("settings").style.display = "none";
    show = true;
  }
}

function setPom(){
  var pomIntervals = document.getElementsByClassName("intervalSet");

  work = parseInt(pomIntervals[0].value);
  fun = parseInt(pomIntervals[1].value);
  longFun = parseInt(pomIntervals[2].value);

}

//Clock Modification Code Ends *************************************************************************************
