
  var config = {
    apiKey: "AIzaSyBiS6WPHL3OFR4OigSeQKibeKbeZ3wlJP4",
    authDomain: "mytrainschedulehomework.firebaseapp.com",
    databaseURL: "https://mytrainschedulehomework.firebaseio.com",
    projectId: "mytrainschedulehomework",
    storageBucket: "mytrainschedulehomework.appspot.com",
    messagingSenderId: "1086803611942"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var Trains = {
    Names: [],
    Destinations: [],
    Frequencies: [], 
    FirstArrival: []
  }
  var initialTrains = {
    Names: ["Red Eye Rooster", "Silver Fox", "Mango Monster"],
    Destinations: ["Boston", "Anchorage", "Tacoma"],
    Frequencies: [350, 1440, 120],
    FirstArrival: ["04:45", "09:21", "02:18"]
  }
  // database.ref().set({
  //   Trains: initialTrains
  // });

  var intervalId = setInterval(updateScheduleDisplay, 60000);
  // $("#my-train-schedule").scrollIntoView(false);
//________________________________________________________________
  function updateScheduleDisplay() {
    var myListElements = $('.my-line-items');
    for (i=0;i<myListElements.length;i++) {
      myListElements[i].remove();
    }
//________________________________________________________________
    for (i=0;i<Trains.Names.length;i++) {
        updateTrainOnSchedule(Trains.Names[i] , 
                              Trains.Destinations[i], 
                              Trains.Frequencies[i], 
                              Trains.FirstArrival[i],
                              false); 
    }
  }
//________________________________________________________________
  database.ref().on('value', function(snapshot) {
    event.preventDefault();
    var value = snapshot.val();
    var myTrains = value.Trains;
    for (i=0;i<myTrains.Names.length;i++) {
      if (Trains.Names.indexOf(myTrains.Names[i]) < 0) {
        updateTrainOnSchedule(myTrains.Names[i] , 
                              myTrains.Destinations[i], 
                              myTrains.Frequencies[i], 
                              myTrains.FirstArrival[i],
                              true); 
      }
    }
    Trains = myTrains;
    $("#my-train-schedule").scrollTop(0);
  });
//________________________________________________________________
$(document).on('click', '#submit-button', function(event){
  event.preventDefault();
  updateTrainOnSchedule($('#train-name').val() , 
                        $('#destination').val() , 
                        $('#frequency').val(), 
                        $('#first-train-time').val(),
                        true); 
  database.ref().set({
    Trains: Trains
  });
  //  Clear form input fields
  $('#train-name').val('');
  $('#destination').val('');
  $('#frequency').val('');
  $('#first-train-time').val('');
  $("#my-train-schedule").scrollTop($("#my-train-schedule").height());
});
//________________________________________________________________
function convertMinutesToMilitaryTime(minutes)
 { 
  var hrs = Math.floor(minutes / 60); 
  if (hrs % 24 === 0) {
    hrs = 0;
  } 
  var mins = minutes % 60;
  if (hrs < 10) {
    if (mins < 10) {
      return "0" + hrs + ":0" + mins;
    } else {
      return "0" + hrs + ":" + mins;
    }
  } else {
    if (mins < 10) {
      return hrs + ":0" + mins;
    } else {
      return hrs + ":" + mins;         
    }
  }
}

$('#my-train-schedule').on('scroll', myFunction);

function myFunction() {
  event.preventDefault();

  // var headerRow = $('#my-header-row');
  var $myTrainSchedule = $("#my-train-schedule");
  // $headerRow.addClass("sticky");
  // alert("Scrolling");
}
//________________________________________________________________
//  function that adds a new list element for the new train being 
//  added by the user on clicking the submit button
function updateTrainOnSchedule(name, destination, frequency, firstArrivalTime, addToList) {
    var $myTrainSchedule = $("#my-train-schedule");
    var $li = $('<li class="list-group-item list-group-item-secondary my-line-items"></li>');
    var $row = $('<div class="row" style="text-align: center"></div>');
    var $trainNameColumn = $('<div class="col-sm-2">' + name + '</div>');
    var $destinationColumn = $('<div class="col-sm-2">' + destination + '</div>');
    $firstTrainTime = $('#first-train-time').val();
    var $frequencyColumn = $('<div class="col-sm-2">' + frequency + '</div>');
    // Convert first-arrival time into total minutes
    var time = firstArrivalTime.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var firstArrivalMinutes = minutes + hours * 60;

    // build a moment-based first arrival time
    var mFirstArrivaltime = moment(moment().format('MM/DD/YY') + ' ' + firstArrivalTime);
    // alert(moment(mFirstArrivaltime).format('MM/DD/YYYY HH:mm') + " " + firstArrivalTime);
    // take the difference between the current time and the first arrival time
    var result = moment().diff(mFirstArrivaltime, 'minutes');
    // Get current time
    // var today = new Date();
    // var currentMinutes = 60 * today.getHours() + today.getMinutes();
    var currentMinutes = 60 * moment().hours() + moment().minutes();
    // if (firstArrivalMinutes > currentMinutes) {
    if (result < 0) {
      var minutesAway = -result; 
    }
    else {
      var minutesAway = frequency - result % frequency;
    }

    var nextArrivalTime = currentMinutes + minutesAway;
    var NAT = moment().add(minutesAway, 'minutes').format("HH:mm");
    
    // alert('firstArrivalTime=' + firstArrivalTime + ' result=' + result +
    //   ' frequency=' + frequency + ' minutes away='+minutesAway + ' NAT='+NAT);
    // var $nextArrivalColumn = $('<div class="col-sm-2">' + convertMinutesToMilitaryTime(nextArrivalTime) + '</div>');
    var $nextArrivalColumn = $('<div class="col-sm-2">' + NAT + '</div>');
    var $minutesAwayColumn = $('<div class="col-sm-4">' + minutesAway + '</div>');
    $row.append($trainNameColumn);
    $row.append($destinationColumn);
    $row.append($frequencyColumn);
    $row.append($nextArrivalColumn);
    $row.append($minutesAwayColumn);
    $li.append($row);
    $myTrainSchedule.append($li);
    if (addToList) {
      Trains.Names.push(name);
      Trains.Destinations.push(destination);
      Trains.Frequencies.push(frequency);
      Trains.FirstArrival.push(firstArrivalTime);
    }
}