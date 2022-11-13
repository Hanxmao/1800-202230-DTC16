function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      console.log(user.displayName);
      user_Name = user.displayName;
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
    }
  });
}
insertName(); //run the function

function writeHikes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
    name: "CIB Travel-related Make-up Card",
    bank: "CIB",
    details: "Lorem Ipsum1",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    name: "BMO Student-related make-up card", //replace with your own city?
    bank: "BMO",
    details: "Lorem Ipsum2",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    name: "TD Low Interest Make-up Card", //replace with your own city?
    bank: "TD",
    details: "Lorem Ipsum3",
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("March 10, 2022")
    ),
  });
}
