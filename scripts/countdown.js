//Countdown Code Starts

window.onload = function() {          //when window loads runs function without name.
  var set_your_time = null;     // Actually gonna remove this line and starttimer line below and will start timer instead when button is clicked
  startTimer("clock", set_your_time); //clock id that's being passed and date inputed about in miliseconds.
  checkEdits();                       //on load check for local storage for previous edits.
};

function start() {
  document.getElementById("start").disabled = true;
  /*var days = document.getElementById("days").value;
  days = parseFloat(days);
  //if(days === 1) document.writeln("non strict");
  days = days*86400000;

  var hours = document.getElementById("hours").value;
  hours = parseFloat(hours);
  hours = hours*3600000;
  //document.writeln(hours);                                // Work in Progress.
  var minutes = document.getElementById("minutes").value;
  minutes = parseFloat(minutes);
  minutes = minutes*60000;
  //document.writeln(minutes);
  var seconds = document.getElementById("seconds").value;
  seconds = parseFloat(seconds);
  seconds = seconds*1000;
  //document.writeln(seconds);
  var set_your_time = (days+hours+minutes+seconds);*/

  var set_your_time = new Date("May 7, 2017 00:00:00")
  //document.writeln(set_your_time);
  startTimer("clock", set_your_time);
}

function reset() {
  document.getElementById("start").disabled = false;
  clearInterval(timerInterval);
  clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
}

var timerInterval;

function startTimer(passed_id, set_your_time) {
    timerInterval = setInterval(function(){      //created interval that keeps running every 1000 milisecond
    var clock = document.getElementById(passed_id);
    var timer = updateTimer(set_your_time);

    clock.innerHTML = '<span>' + timer.days + '</span>'     //span[0]
                    + '<span>' + timer.hours + '</span>'    //span[1]
                    + '<span>' + timer.minutes + '</span>'  //span[2]
                    + '<span>' + timer.seconds + '</span>'; //span[3]

    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]); //animates seconds every second
    if(timer.seconds == 59) animateClock(spans[2]); //animates minutes only if seconds = 59
    if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);  //animates hour only if seconds and minutes = 59
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]); //animates days only if hours, minutes, and seconds = 59


    if(timer.total < 1){            //if statement check
      clearInterval(timerInterval); // if true clears interval we created earlier
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>'; //then sets everything to zero
    }


  }, 1000);   //end of interval but keeps going every 1000 miliseconds
}    //out of interval no more code to run.


function updateTimer(set_your_time){
  var time = set_your_time - new Date();  //provided time minus current time equals time left.

  return {
    'days': Math.floor( time/(1000*60*60*24) ),     //checks how many days are in provide miliseconds
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),//checks hours in provided miliseconds
    'minutes': Math.floor( (time/1000/60) % 60 ),   //checks minutes in provided milliseconds
    'seconds': Math.floor( (time/1000) % 60 ),      //checks seconds in provided milliseconds
    'total' : time
  };
}


function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}

//Countdown Code Ends

//Save Name Changes Code Starts

function saveEdits() {                                //Made my saveEdits function.
  var edit_Name = document.getElementById("edit");    //Then grabbed element with id "edit" in Html and set to var.
  var new_Name = edit_Name.innerHTML;                 //Grabbed new changes to element and assigned to new var.
  localStorage.userEdits = new_Name;                  //Saved new name to user storage.

}

function checkEdits() {                                                 //Made CheckEdits function.
  if(localStorage.userEdits!=null)                                      //Set check for local storage if empty or not.
  document.getElementById("edit").innerHTML = localStorage.userEdits;   //if not empty then inject local storage save to element with id "edit".

}

//Save Name Changes Code Ends

//noob suggestions for additions to timer code

/* something like:

 document.getElementById("pauseBtn").onclick = function(){pauseTimer}

function pauseTimer(){
 ~some code to pause the timer~
}
*/

/* another something like:

 document.getElementById("playBtn").onclick = function(){resumeTimer}

function resumeTimer(){
 ~some code to pause the timer~
}
*/

/*
maybe:

document.getElementById("resetbutton").onclick = function(){~maybe call your starttimer in here ?}

*/
