var currentUser

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        // the populatedInfo function will check the values for each input, if it's not null then present the data that already exist in database
        populateInfo()
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
  });

//get user data from firebase and put them in the form
function populateInfo(){
    //read the current user document from user collection
    currentUser.get()
    .then(userDoc =>{
        let name = userDoc.data().name
        let country = userDoc.data().country
        let province = userDoc.data().province
        let city = userDoc.data().city
        let phone = userDoc.data().phone
        let postal_code = userDoc.data().postal_code

        if (name != null){
            document.getElementById('name').value = name
        }
        if (country != null){
            document.getElementById('country').value = country
        }
        if (province != null){
            document.getElementById('province').value = province
        }
        if (city != null){
            document.getElementById('city').value = city
        }
        if (phone != null){
            document.getElementById('phone').value = phone
        }
        if (postal_code != null){
            document.getElementById('post_code').value = postal_code
        }
    })

}


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

//will trigger once user click the "save" button, and grab the input values and update them to current user document in firebase
function saveUserInfo(){
    userName = document.getElementById('name').value
    userCountry = document.getElementById('country').value
    userProvince = document.getElementById('province').value
    userCity = document.getElementById('city').value
    userPhone = document.getElementById('phone').value
    userPostalCode = document.getElementById('post_code').value
    //update(write) the data to each field in current user document
    currentUser.update({
        name: userName,
        country: userCountry,
        province: userProvince,
        city: userCity,
        phone: userPhone,
        postal_code: userPostalCode
    })
}