window.onload = function(){
  var christmasDay = new Date("March 16, 2017 00:00:00");
  startTimer("clock", christmasDay);
};

function startTimer(id, christmasDay){
  var timerInterval = setInterval(function(){
    var clock = document.getElementById(id);
    var timer = updateTimer(christmasDay);

    clock.innerHTML = '<span>' + timer.days + '</span>'
                    + '<span>' + timer.hours + '</span>'
                    + '<span>' + timer.minutes + '</span>'
                    + '<span>' + timer.seconds + '</span>';

    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if(timer.seconds == 59) animateClock(spans[2]);
    if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

   
    if(timer.total < 1){
      clearInterval(timerInterval);
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
    }


  }, 1000);
}


function updateTimer(christmasDay){
  var time = christmasDay - new Date();
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),
    'minutes': Math.floor( (time/1000/60) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}


function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}






