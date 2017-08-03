$( document ).ready(function() {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAM--kW2HVvqYuWfbSkNTLcoVi9Qlyh2zM",
		authDomain: "traintime-b2cf7.firebaseapp.com",
		databaseURL: "https://traintime-b2cf7.firebaseio.com",
		projectId: "traintime-b2cf7",
		storageBucket: "traintime-b2cf7.appspot.com",
		messagingSenderId: "867670921797"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	$("#btn-add").on("click", function() {
		var trainName = $("#input-train").val().trim();
		var trainDest = $("#input-destination").val().trim();
		var trainTime = $("#input-time").val().trim();
		var trainFreq = $("#input-frequency").val().trim();

		database.ref("/trains").push({
			trainName : trainName,
			trainDest : trainDest,
			trainTime : trainTime,
			trainFreq : trainFreq,
			dateAdded : firebase.database.ServerValue.TIMESTAMP
		});
	});

	database.ref("/trains").on("child_added", function(snapshot) {
		console.log(snapshot.val().dateAdded);
		var timeStamp = moment(snapshot.val().dateAdded).format("MM/DD/YY");
		var nextArrival = 0;
		var minutesAway = 0;
		var trainRow = "<tr><td>" + snapshot.val().trainName + "</td><td>"
			+ snapshot.val().trainDest + "</td><td>"
			+ snapshot.val().trainFreq + "</td><td>"
			+ nextArrival + "</td><td>"
			+ minutesAway + "</td></tr>";
		$("#row-train").append(trainRow);
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
});