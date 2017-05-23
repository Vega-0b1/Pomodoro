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
  localStorage.userBreakValue = breakValue;
  localStorage.userLongBreakValue = longBreakValue;
  workMode = false;
  breakMode = true;
}

var workMode,breakMode,longBreakMode,justHadLBreak;
var pomodoros = 0;

function decideTimer() {
  if(workMode){
    convertTime(workValue);
    console.log("workMode")
    breakMode = true;
    workMode = false;
    pomodoros = pomodoros + 1;
    if(justHadLBreak == true){
      pomodoros = 0;
      justHadLBreak = false;
    }
    updatePomodoros();
    console.log(pomodoros);

    if(pomodoros >= 6){
      breakMode = false;
      longBreakMode = true;
    }
    intervalDone();
  }
  else if(breakMode){
    console.log("breakMode");
    pomodoros = pomodoros + 1;
    updatePomodoros();
    console.log(pomodoros);
    convertTime(breakValue);

    workMode = true;
    breakMode = false;
    intervalDone();
  }
  else if(longBreakMode){
    console.log("longbreakMode");
    convertTime(longBreakValue);

    workMode = true;
    justHadLBreak = true;
    longBreakMode = false;

    updatePomodoros();
    document.getElementById("pomodoros").innerHTML = "Pomodoros 4";
    document.getElementById("workBreakTime").innerHTML = "Long Break Time!";
    pomodoros = 0;
    intervalDone();
  }

}

function updatePomodoros(){
  if(pomodoros == 0){
    document.getElementById("pomodoros").innerHTML = "Pomodoros 0";
    document.getElementById("workBreakTime").innerHTML = "Work Time";
  }
  if(pomodoros == 1) {
    document.getElementById("pomodoros").innerHTML = "Pomodoros 1";
    document.getElementById("workBreakTime").innerHTML = "Break Time";
  }

  if(pomodoros == 2) document.getElementById("workBreakTime").innerHTML = "Work Time";

  if(pomodoros == 3){
    document.getElementById("pomodoros").innerHTML = "Pomodoros 2";
    document.getElementById("workBreakTime").innerHTML = "Break Time";
  }

  if(pomodoros == 4) document.getElementById("workBreakTime").innerHTML = "Work Time";

  if(pomodoros == 5){
    document.getElementById("pomodoros").innerHTML = "Pomodoros 3";
    document.getElementById("workBreakTime").innerHTML = "Break Time";
  }

  if(pomodoros == 6) document.getElementById("workBreakTime").innerHTML = "Work Time";

}
