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

function checkIntervalSaves() {
  if(localStorage.userWorkValue != null) {
    workValue = localStorage.userWorkValue;
    workValue = parseInt(workValue);
    document.getElementById("test").value = workValue;
    document.getElementById("test2").innerHTML = workValue;
  }
  else {
    workValue = 25;
    workMode = false;
    breakMode = true;
    startStop();
  }
}
