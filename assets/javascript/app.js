
$(document).on('click', '#submit-button', addNewTrainToSchedule);
function addNewTrainToSchedule(event) {
    event.preventDefault();
    var $myTrainSchedule = $("#my-train-schedule");
    var $li = $('<li class="list-group-item list-group-item-secondary my-line-items"></li>');
    var $row = $('<div class="row" style="text-align: center"></div>');
    var $trainNameColumn = $('<div class="col-sm-2">Train C</div>');
    var $destinationColumn = $('<div class="col-sm-2">Seattle</div>');
    var $frequencyColumn = $('<div class="col-sm-2">8 hr (min)</div>');
    var $nextArrivalColumn = $('<div class="col-sm-2">18:55</div>');
    var $minutesAwayColumn = $('<div class="col-sm-4">145</div>');
    $row.append($trainNameColumn);
    $row.append($destinationColumn);
    $row.append($frequencyColumn);
    $row.append($nextArrivalColumn);
    $row.append($minutesAwayColumn);

    $li.append($row);
    $myTrainSchedule.append($li);
}