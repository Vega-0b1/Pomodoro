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
      setPom();
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
      setPom();
      console.log(newTime);
      if(newTime <= 0) spanZero("clock",newTime);
      else{
      startTimer("clock", newTime);
      }
    }
  }
}

function checkIntervalSaves() {
  if(localStorage.userWorkValue != null) {
    workValue = localStorage.userWorkValue;
    workValue = parseInt(workValue);
    document.getElementById("test").value = workValue;
    document.getElementById("test2").innerHTML = workValue;

    breakValue = localStorage.userBreakValue;
    breakValue = parseInt(breakValue);
    document.getElementById("test3").value = breakValue;
    document.getElementById("test4").innerHTML = breakValue;

    longBreakValue = localStorage.userLongBreakValue;
    longBreakValue = parseInt(longBreakValue);
    document.getElementById("tes5").value = longBreakValue;
    document.getElementById("test6").innerHTML = longBreakValue;
  }
  else {
    workValue = 25;
    workMode = false;
    breakMode = true;
    startStop();
  }
}
function spanZero(id,time){
  clock.innerHTML = "<span>0</span><span>0</span>";
  breakMode = true;
  workMode = false;

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;
}
