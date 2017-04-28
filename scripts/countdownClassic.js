window.onload = function() {          //when window loads runs function without name.
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = true;
  checkSavedTime();
  checkEdits();                      //on load check for local storage for previous edits.
  checkUserPresets();
};

//global variables//
var timerInterval;
var timeLeftOnExit;
var globalTime;
var shouldBePaused;
var daysOn;
var incrementOnChange = 1;
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
  localStorage.userPauseState = true;
  shouldBePaused = true;

  var minutes = 25;
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

function checkUserPresets() {
  if(localStorage.userDaysPreset!=null) {
   if(localStorage.userDaysPreset == "true") {
     daysOn = true;
     document.getElementById("daySetting").checked = true;
   }
   else if(localStorage.userDaysPreset == "false") {
     daysOn = false
     document.getElementById("daySetting").checked = false;
   }

   incrementOnChange = localStorage.userSaveIncrementChange;
 }



}
//Save Name/Timer Code Ends******************************************************************************************************************************************************************************************************



//Clock Modification Code Starts **********************************************************************************
function omitDays() {
  incrementOnChange = ++incrementOnChange;
  if(incrementOnChange >= 10) incrementOnchange = 0;
  localStorage.userSaveIncrementChange = incrementOnChange;
  if(incrementOnChange % 2) {
    daysOn = false;
    localStorage.userDaysPreset = daysOn;
  }
  else daysOn = true;
    localStorage.userDaysPreset = daysOn;
}





//Clock Modification Code Ends *************************************************************************************
