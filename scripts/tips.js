firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //read the documents from tips collection
        displayTips("tips");
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});

function displayTips(collection) {
    //read the documents from collection
    db.collection(collection).get()
        .then(snap => {
            // present 3 tips that store in firebase to the 4th to 6th collapse
            i = 4
            snap.forEach(doc => { 
                var title = doc.data().title;    
                var description = doc.data().description

                document.querySelector(`#title${i}`).innerHTML = title;
                document.querySelector(`#description${i}`).innerHTML = description;
                i++
            }
            )
        })
}


//------------------------------write tips data from tips.json(Done)--------------------------
//just for fun, not necessary. Not a good idea to store sentences and paragraphs to database, because it will not recognize the newline character, so it will mess up the structure.
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