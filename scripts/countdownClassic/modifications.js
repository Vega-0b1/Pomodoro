function startStop() {
  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;

  sliderTampered = true;
  shouldBePaused = true;
  set();
}

function settings() {
  if(show) {
    document.getElementById("settings").style.display = "inline";
    show = false;
  }
  else{
    document.getElementById("settings").style.display = "none";
    show = true;
  }
}

function setPom() {
  var pomIntervals = document.getElementsByClassName("intervalSet");

  workValue = parseInt(pomIntervals[0].value);
  breakValue = parseInt(pomIntervals[1].value);
  longBreakValue = parseInt(pomIntervals[2].value);
  localStorage.userWorkValue = workValue;
  workMode = false;
  breakMode = true;
}

var workMode,breakMode;

function decideTimer() {
  if(workMode){
    var minutes = workValue;
    minutes = parseInt(minutes);
    minutes = minutes*60000;

    var seconds = 01;
    seconds = parseInt(seconds);
    seconds = seconds*1000;

    globalTime = (minutes+seconds);

    breakMode = true;
    resume();
  }
  else if(breakMode){
    var minutes = breakValue;
    minutes = parseInt(minutes);
    minutes = minutes*60000;

    var seconds = 01;
    seconds = parseInt(seconds);
    seconds = seconds*1000;

    globalTime = (minutes+seconds);

    workMode = true;
    resume();
  }

}
