function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      user_Name = user.displayName;
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
      //alert user and redirect to login page if user is not login
      alert("Please Log In to process the page.");
      window.location.href = 'login.html'
    }
  });
}

insertName(); 