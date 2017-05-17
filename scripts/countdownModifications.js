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
}

function decideTimer() {



}
