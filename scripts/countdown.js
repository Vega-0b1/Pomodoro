window.onload = function() {          //when window loads runs function without name.
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = true;
  checkSavedTime();
  checkEdits();                      //on load check for local storage for previous edits.
};

//global variables//
var timerInterval;
var timeLeftOnExit;
var globalTime;
var shouldBePaused;
var sliderTampered;
var show = false;
//***************//

//Countdown Code Starts*********************************************************************************************************************************************************************************************************************
function startTimer(passedId, passedTime) {
  globalTime = passedTime;
  timerInterval = setInterval(function(){      //created interval that keeps running every 1000 milisecond


      var clock = document.getElementById(passedId);


        var timer = updateTimer();

          clock.innerHTML = "<span>" + timer.days + "</span>"     //span[0]
                          + "<span>" + timer.hours + "</span>"    //span[1]
                          + "<span>" + timer.minutes + "</span>"  //span[2]
                          + "<span>" + timer.seconds + "</span>"; //span[3]

          var spans = clock.getElementsByTagName("span");
          animateClock(spans[3]); //animates seconds every second
          if(timer.seconds == 59) animateClock(spans[2]); //animates minutes only if seconds = 59
          if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);  //animates hour only if seconds and minutes = 59
          if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]); //animates days only if hours, minutes, and seconds = 59

          if(timer.total < 1){            //if statement check
            clearInterval(timerInterval); // if true clears interval we created earlier
            clock.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>"; //then sets everything to zero
          }

          if(shouldBePaused == true)
            clearInterval(timerInterval);





  }, 1000);   //end of interval but keeps going every 1000 miliseconds
}    //out of interval no more code to run.

function updateTimer() {
  if(sliderTampered) globalTime = globalTime + 1000;
  sliderTampered = false;

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
  if(sliderTampered != true){
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = false;
  localStorage.userPauseState = false;
  shouldBePaused = false;
}


  var days = document.getElementById("days").value;
  days = parseInt(days);
  days = days*86400000;

  var hours = document.getElementById("hours").value;
  hours = parseInt(hours);
  hours = hours*3600000;

  var minutes = document.getElementById("minutes").value;
  minutes = parseInt(minutes);
  minutes = minutes*60000;

  var seconds = document.getElementById("seconds").value;
  seconds = parseInt(seconds);
  seconds = seconds*1000;

  globalTime = (days+hours+minutes+seconds);


  startTimer("clock", globalTime);
}

function resume() {
  clearInterval(timerInterval);
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = false;
  localStorage.userPauseState = false;
  shouldBePaused = false;

startTimer("clock", globalTime);
}

function pause() {

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;
  localStorage.userPauseState = true;
  clearInterval(timerInterval);
}
//Set,Resume,Pause, Code Ends**********************************************************************************************************************************************************************************************************



//Save Name/Timer Code Starts*******************************************************************************************************************************************************************************************************
function saveEdits() {                                //Made my saveEdits function.
  var edit_Name = document.getElementById("edit");    //Then grabbed element with id "edit" in Html and set to var.
  var new_Name = edit_Name.innerHTML;                 //Grabbed new changes to element and assigned to new var.
  localStorage.userEdits = new_Name;                  //Saved new name to user storage.
}

function saveTime() {
  localStorage.userTimeLeft = globalTime;
  localStorage.userDateOfExit = new Date();
}

function checkEdits() {                                                 //Made CheckEdits function.
  if(localStorage.userEdits!=null)                                      //Set check for local storage if empty or not.
  document.getElementById("edit").innerHTML = localStorage.userEdits;   //if not empty then inject local storage save to element with id "edit".
}

function checkSavedTime(){
  if(localStorage.userTimeLeft!=null) {
      var timeLeft = localStorage.userTimeLeft;
      timeLeft = parseInt(timeLeft);
      var pauseState = localStorage.userPauseState;

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
        var dateOfExit = new Date(localStorage.userDateOfExit);
        dateOfExit = dateOfExit.getTime();

        var dateOfReturn = new Date();
        dateOfReturn = dateOfReturn.getTime();

        var timeElapsed = dateOfReturn - dateOfExit;
        document.getElementById("resume").disabled = true;
        document.getElementById("pause").disabled = false;
        localStorage.userPauseState = false;

        var newTime = timeLeft - timeElapsed;

        startTimer("clock", newTime);
      }
  }
}

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

  var work = pomIntervals[0].value;
  var fun = pomIntervals[1].value;
  var longFun = pomIntervals[2].value;
}


//Save Name/Timer Code Ends******************************************************************************************************************************************************************************************************
