window.onload = function() {          //when window loads runs function without name.
  document.getElementById("resume").disabled = true;
  document.getElementById("pause").disabled = true;
  document.getElementById("settings").style.display = "none";
  show = true;
  checkSavedTime();
  checkIntervalSaves();
};

//global variables//
var timerInterval;
var timeLeftOnExit;
var globalTime;
var shouldBePaused;
var show;
var workValue
var breakValue
var longBreakValue;
//***************//

function startTimer(passedId, passedTime) {
  globalTime = passedTime;
  timerInterval = setInterval(function(){      //created interval that keeps running every 1000 milisecond


    var clock = document.getElementById(passedId);

    var timer = updateTimer();

    clock.innerHTML = "<span>" + timer.minutes + "</span>"     //span[0]
                    + "<span>" + timer.seconds + "</span>";    //span[1]

    var spans = clock.getElementsByTagName("span");
    animateClock(spans[1]); //animates seconds every second

    if(timer.seconds == 59) animateClock(spans[0]);
      var spans = clock.getElementsByTagName("span");

    if(timer.total < 1){            //if statement check
      clearInterval(timerInterval);
      decideTimer();
    }

    if(shouldBePaused == true)
      clearInterval(timerInterval);

  }, 1000);   //end of interval but keeps going every 1000 miliseconds
}    //out of interval no more code to run.

function updateTimer() {
  var time = globalTime = globalTime - 1000;  //provided time minus current time equals time left.
  saveTime();

  return {
    "minutes": Math.floor( (time/1000/60) % 60.1 ),   //checks minutes in provided milliseconds
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
