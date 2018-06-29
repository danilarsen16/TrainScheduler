
var name = '';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';



$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyDEA3zR_BeI5C_bH4aGWNuTdRjLk77GP4A",
    authDomain: "train-homework-8b1df.firebaseapp.com",
    databaseURL: "https://train-homework-8b1df.firebaseio.com",
    projectId: "train-homework-8b1df",
    storageBucket: "train-homework-8b1df.appspot.com",
    messagingSenderId: "304107896929"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database()

  $("#add-train").on("click", function () {
    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Dont forget to provide initial data to your Firebase database.
    name = $('#name-input').val().trim();
    destination = $('#destination-input').val().trim();
    firstTrainTime = $('#first-train-time-input').val().trim();
    frequency = $('#frequency-input').val().trim();
    firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    minutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

    var newTrain = {
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      nextTrainFormatted: nextTrainFormatted,
      minutesTillTrain: minutesTillTrain
    }
    // Code for the push
    database.ref().push(newTrain);


    $('#name-input').val('');
    $('#destination-input').val('');
    $('#first-train-time-input').val('');
    $('#frequency-input').val('');

    return false;
  });

  database.ref().on("child_added", function (childSnapshot) {

console.log(childSnapshot.key);

    $('.train-schedule').append("<tr class='table-row' id='" + childSnapshot.key +"'>" +
      "<td class='col-xs-3'>" + childSnapshot.val().name +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().destination +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().frequency +
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
      "</td>" +
      "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
      "</td>" +
      "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
      "</tr>");
    // Handle the errors
    var key = childSnapshot.key
  $("body").on("click", ".remove-train", function (childSnapshot) {
    $(this).closest('tr').remove();
   
    console.log( $(this).closest('tr'))
    // getKey = JSON.stringify($(this).parent().parent().attr('id'));
    console.log(key);
    database.ref(key).remove();
  });
  })
}); // Closes jQuery wrapper