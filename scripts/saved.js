let currentUser

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        getSaved(user)
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});

function setCardData(id) {
    localStorage.setItem('cardID', id);
}

function removeCard(code){
    //remove(write) the card code from the saved_cards array from current user document
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayRemove(code)
    },{
        merge:true
    })
    document.getElementById(`inform${code}`).innerHTML = 'Removed!'
    
}

function getSaved(user) {
    //read current user document
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var saved_cards = userDoc.data().saved_cards;
            let cardTemplate = document.getElementById("cardTemplate");
            saved_cards.forEach(cardID => {
                //read the documents from credit_card collection that code filed value same as cardID
                db.collection("credit_card").where("code", "==", cardID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        let doc = queryData[0].data()
                        let title = doc.name;
                        let description = doc.description;
                        let code = doc.code;
                        let newcard = cardTemplate.content.cloneNode(true);
                        
                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('#description').innerHTML = description;
                        newcard.querySelector('#card-img').src = `./images/card_img${code[code.length - 1]}.svg`;
                        all_links = newcard.querySelectorAll('a')
                        all_links.forEach((a) => {
                            a.onclick = () => setCardData(code)
                        })

                        //remove the card from the saved_card array once the user click the remove button
                        newcard.querySelector('#remove').onclick = () => removeCard(code)
                        //prompt user "removed" once the card is removed
                        newcard.querySelector('#inform').id = `inform${code}`
            
                        document.getElementById("eachCard").appendChild(newcard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}