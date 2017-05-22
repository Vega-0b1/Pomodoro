function set() {
  clearInterval(timerInterval);

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;

  localStorage.userPauseStateClassic = true;
  shouldBePaused = true;

  convertTime(workValue);

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
  clearInterval(timerInterval);

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;

  localStorage.userPauseStateClassic = true;
}

function convertTime(passedTime) {
  var minutes = passedTime;
  minutes = parseInt(minutes);
  minutes = minutes*60000;

  var seconds = 01;
  seconds = parseInt(seconds);
  seconds = seconds*1000;

  globalTime = (minutes+seconds);
}

function intervalDone() {
  clearInterval(timerInterval);

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;

  localStorage.userPauseStateClassic = true;
  shouldBePaused = true;

  startTimer("clock", globalTime);
}


function playAudio() {
    var notification = document.getElementById("sound");
    notification.play();
}
