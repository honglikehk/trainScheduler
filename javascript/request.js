$(document).ready(function() {
  let config = {
    apiKey: "AIzaSyDEtkQJUtK_1PcNFWIsnhZBRq5eK1OXR3c",
    authDomain: "food-passion-1491771293897.firebaseapp.com",
    databaseURL: "https://food-passion-1491771293897.firebaseio.com",
    projectId: "food-passion-1491771293897",
    storageBucket: "",
    messagingSenderId: "227792520414",
    appId: "1:227792520414:web:53dcf74d8c48dab2"
  };

  firebase.initializeApp(config);

  let database = firebase.database();

  // let trainName = "";
  // let destination = "";
  // let firstTrain = 0;
  // let frequency = 0;

  $("#submitBtn").on("click", function(event) {
    event.preventDefault();

    let train = {
      trainName: $("#searchName")
        .val()
        .trim(),
      destination: $("#searchDes")
        .val()
        .trim(),
      firstTrain: $("#searchTime")
        .val()
        .trim(),
      frequency: $("#searchFreq")
        .val()
        .trim()
    };
    // trainName = $("#searchName")
    //   .val()
    //   .trim();
    // destination = $("#searchDes")
    //   .val()
    //   .trim();
    // firstTrain = $("#searchTime")
    //   .val()
    //   .trim();
    // frequency = $("#searchFreq")
    //   .val()
    //   .trim();
    setTime(train);

    database.ref("/trains").push(train);
  });

  $("#clearBtn").on("click", function() {
    // event.preventDefault();
    trainName.empty();
    destination.empty();
    firstTrain.empty();
    frequency.empty();
  });

  let setTime = function(train) {
    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(train.firstTrain, "HH:mm").subtract(
      1,
      "years"
    );

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    let tRemainder = diffTime % train.frequency;

    // Minute Until Train
    let tMinutesTillTrain = train.frequency - tRemainder;

    // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");

    train.minAway = tMinutesTillTrain;
    train.nextArrival = moment(nextTrain).format("hh:mm");
  };

  database
    .ref("/trains")
    .orderByChild("dateAdded")
    .on("child_added", function(snapshot) {
      $(".spreadsheet").append(
        `<tr><td>${snapshot.val().trainName}</td>
        <td>${snapshot.val().destination}</td>
        <td>${snapshot.val().frequency}</td>
        <td>${snapshot.val().nextArrival}</td>
       <td>${snapshot.val().minAway} mins away</td>
        </tr>`
      );
    });
});
