// Assumptions
let tFrequency = 0;

// Time is 3:30 AM
let firstTime = "";

// create functions for the generated times
let firstTimeConverted = function() {
  firstTime = snapshot.val().firstTrain;
  return moment(firstTime, "HH:mm").subtract(1, "years");
};

let diffTime = function(firstTimeConverted) {
  return moment().diff(moment(firstTimeConverted), "minutes");
};

let tRemainder = function(diffTime) {
  tFrequency = snapshot.val().frequency;
  return diffTime % tFrequency;
};

// create functions for the generated times
let tMinutesTillTrain = function(tRemainder) {
  tFrequency = snapshot.val().frequency;
  return tFrequency - tRemainder;
};

let nextArrival = function(tMinutesTillTrain) {
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");
  return moment(nextTrain).format("hh:mm");
};
