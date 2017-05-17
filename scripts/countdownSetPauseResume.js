function set() {
  clearInterval(timerInterval);

  document.getElementById("resume").disabled = false;
  document.getElementById("pause").disabled = true;

  localStorage.userPauseStateClassic = true;
  shouldBePaused = true;

  var minutes = workValue;
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
