function displayTips(collection) {
    db.collection(collection).get()
        .then(snap => {
            i = 1
            snap.forEach(doc => { 
                var title = doc.data().title;   
                console.log(title);   
                var description = doc.data().description

                document.querySelector(`#title${i}`).innerHTML = title;
                document.querySelector(`#description${i}`).innerHTML = description;
                i++
            }
            )
        })
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayTips("tips");
    } else {
        alert("Please Log In to process the page.");
    }
  });












//------------------------------write tips data from tips.csv--------------------------
async function getJSONdata() {
    const response = await fetch('./tips.json'); //send get request
    const data = await response.text();      //get file response
    const tips = JSON.parse(data)

    tips["tips"].forEach(tip => {
        const title = tip.title;     //get tips title
        const description = tip.description;        //tips description
        db.collection('tips').add({     //write data to firebase
            title:title,
            description:description
        })
    })
}