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

function setPom() {
  var pomIntervals = document.getElementsByClassName("intervalSet");

  work = parseInt(pomIntervals[0].value);
  fun = parseInt(pomIntervals[1].value);
  longFun = parseInt(pomIntervals[2].value);
}
