let count = 100;

database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
  count = snapshot.val().clickCount;
  $("#clickValue").html(count);
});

$("#clickButton").on("click", function(event) {
  event.preventDefault();
  count--;
  database.ref().set({
    clickCount: count
  });
});

$("#restartButton").on("click", function(event) {
  event.preventDefault();
  database.ref().set({
    clickCount: 100
  });
});
