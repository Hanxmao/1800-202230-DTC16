var cardReview = localStorage.getItem("cardReview"); //visible to all functions on this page

function getReviewName(ReviewName) {
  db.collection("hikes")
    .where("code", "==", ReviewName)
    .get()
    .then((queryHike) => {
      //see how many items are returned from the query with ".size"
      size = queryHike.size;
      // get the documents returned from query with ".docs"
      hikes = queryHike.docs;

      // We want to have one document per hike, so if the the result of
      //the query is more than one, we can check it right now and clean the DB if needed.
      if ((size = 1)) {
        var thisHike = hikes[0].data();
        name = thisHike.name;
        document.getElementById("ReviewName").innerHTML = name;
      } else {
        console.log("Query has more than one data");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function writeReview() {
  let Title = document.getElementById("title").value;
  let Level = document.getElementById("level").value;
  let Refer = document.getElementById("refer").value;
  let Description = document.getElementById("description").value;

  console.log(Title, Level, Refer, Description);
}

function writeReview() {
  console.log("inside write review");
  let Title = document.getElementById("title").value;
  let Level = document.getElementById("level").value;
  let Refer = document.getElementById("season").value;
  let Description = document.getElementById("description").value;

  console.log(Title, Level, Refer, Description);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        db.collection("reviews")
          .add({
            code: cardReview,
            userID: userID,
            title: Title,
            level: Level,
            refer: Refer,
            description: Description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "thanks.html"; //new line added
          });
      });
    } else {
      // No user is signed in.
    }
  });
}

var hikeID = localStorage.getItem("hikeID"); //visible to all functions on this page

function getHikeName(ReviewName) {
  db.collection("hikes")
    .where("code", "==", ReviewName)
    .get()
    .then((queryHike) => {
      //see how many items are returned from the query with ".size"
      size = queryHike.size;
      // get the documents returned from query with ".docs"
      hikes = queryHike.docs;

      // We want to have one document per hike, so if the the result of
      //the query is more than one, we can check it right now and clean the DB if needed.
      if ((size = 1)) {
        var thisHike = hikes[0].data();
        name = thisHike.name;
        document.getElementById("hikeName").innerHTML = name;
      } else {
        console.log("Query has more than one data");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
getReview(cardReview);
