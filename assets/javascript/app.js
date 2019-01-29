
$(document).on('click', '#submit-button', addNewTrainToSchedule);
//  function that adds a new list element for the new train being added by the user on clicking 
//  the submit button
function addNewTrainToSchedule(event) {
    event.preventDefault();
    var $myTrainSchedule = $("#my-train-schedule");
    var $li = $('<li class="list-group-item list-group-item-secondary my-line-items"></li>');
    var $row = $('<div class="row" style="text-align: center"></div>');
    var $trainNameColumn = $('<div class="col-sm-2">' + $('#train-name').val() + '</div>');
    var $destinationColumn = $('<div class="col-sm-2">' + $('#destination').val() + '</div>');
    $firstTrainTime = $('#first-train-time').val();
    var $frequencyColumn = $('<div class="col-sm-2">' + $('#frequency').val() + '</div>');
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
}