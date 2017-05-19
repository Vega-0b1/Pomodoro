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

var workMode,breakMode,longBreakMode;
var pomodoros = 0;

function decideTimer() {
  if(workMode){
    convertTime(workValue);
    console.log("workMode")
    breakMode = true;
    workMode = false;
    pomodoros = pomodoros + 1;
    console.log(pomodoros);

    if(pomodoros >= 8){
      breakMode = false;
      longBreakMode = true;
      pomodoros = 0;
    }
    resume();
  }
  else if(breakMode){
    console.log("breakMode");
    pomodoros = pomodoros + 1;
    console.log(pomodoros);
    convertTime(breakValue);

    workMode = true;
    breakMode = false;
    resume();
  }
  else if(longBreakMode){
    console.log("longbreakMode");
    convertTime(longBreakValue);

    workMode = true;
    longBreakMode = false;
    resume();
  }

}
