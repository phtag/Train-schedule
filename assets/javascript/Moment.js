
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
    Frequencies: []
  }
  var initialTrains = {
    Names: ["Red Eye Rooster", "Silver Fox", "Mango Monster"],
    Destinations: ["Boston", "Anchorage", "Tacoma"],
    Frequencies: [350, 1440, 120]
  }
  // database.ref().set({
  //   Trains: initialTrains
  // });

  database.ref().on('value', function(snapshot) {
    event.preventDefault();
    var value = snapshot.val();
    var myTrains = value.Trains;
    for (i=0;i<myTrains.Names.length;i++) {
      if (Trains.Names.indexOf(myTrains.Names[i]) < 0) {
        addTrainToSchedule(myTrains.Names[i] , myTrains.Destinations[i], myTrains.Frequencies[i]); 
      } 
    }
    Trains = myTrains;
  });
$(document).on('click', '#submit-button', function(event){
  alert("Submission");
  event.preventDefault();
  addTrainToSchedule($('#train-name').val() , $('#destination').val() , $('#frequency').val()); 
  database.ref().set({
    Trains: Trains
  });
});
//  function that adds a new list element for the new train being added by the user on clicking 
//  the submit button
function addTrainToSchedule(name, destination, frequency) {
    var $myTrainSchedule = $("#my-train-schedule");
    var $li = $('<li class="list-group-item list-group-item-secondary my-line-items"></li>');
    var $row = $('<div class="row" style="text-align: center"></div>');
    var $trainNameColumn = $('<div class="col-sm-2">' + name + '</div>');
    var $destinationColumn = $('<div class="col-sm-2">' + destination + '</div>');
    $firstTrainTime = $('#first-train-time').val();
    var $frequencyColumn = $('<div class="col-sm-2">' + frequency + '</div>');
    var $nextArrivalColumn = $('<div class="col-sm-2">18:55</div>');
    var $minutesAwayColumn = $('<div class="col-sm-4">145</div>');
    $row.append($trainNameColumn);
    $row.append($destinationColumn);
    $row.append($frequencyColumn);
    $row.append($nextArrivalColumn);
    $row.append($minutesAwayColumn);
    $li.append($row);
    $myTrainSchedule.append($li);
    $('#train-name').val('');
    $('#destination').val('');
    $('#frequency').val('');
    Trains.Names.push(name);
    Trains.Destinations.push(destination);
    Trains.Frequencies.push(frequency);
}