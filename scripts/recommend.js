let urlParams = new URLSearchParams(window.location.search)
let annual_fee = Number(urlParams.get("annual_fee"))
let extra_fee = Number(urlParams.get("extra_fee"))
let welcome_bonus = Number(urlParams.get("welcome_bonus"))
let travel = urlParams.get("travel")
let role = urlParams.get("role")
let type = urlParams.get("type")
let cardID

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        // read the value in saved_cards filed in current user document
        currentUser.get().then(userDoc => {
            saved_cards = userDoc.data().saved_cards;
        })
        displayCards("credit_cards");
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});

function setCardData(id) {
    localStorage.setItem('cardID', id);
}

function saveCard(id) {
    //add(write) credit card code saved_cards field
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayUnion(id)
    }, {
        merge: true
    })
    // prompt the user when save button being clicked
    document.getElementById(`inform${id}`).innerHTML = "Saved"
}

function displayCards(collection) {
    if (role != "none") {
        //read the data from the documents in collection, that category field value same as role, and limit 2 documents from the documents array
        db.collection(collection).where("category", "==", role).limit(2).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);

                    //if the card already saved by user, then change "save" to "saved" to prompt user
                    if (saved_cards && saved_cards.includes(cardID)) {
                        newcard.querySelector('#save').innerHTML = "Saved"
                    }

                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                    all_links = newcard.querySelectorAll('a')
                    all_links.forEach((a) => {
                        a.onclick = () => setCardData(cardID)//call setCardData function to set cardID in local storage
                    })
                    newcard.querySelector('#inform').id = `inform${cardID}`
                    newcard.querySelector('#save').onclick = () => saveCard(cardID) //call saveCard to add the card code to saved_card array in current user document

                    document.getElementById("eachCard").appendChild(newcard);
                })
            })
    }
    if (type != "none") {
        //read the data from the documents in collection, that category field value same as type, and limit 2 documents from the documents array
        db.collection(collection).where("category", "==", type).limit(2).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);

                    if (saved_cards && saved_cards.includes(cardID)) {
                        newcard.querySelector('#save').innerHTML = "Saved"
                    }
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                    all_links = newcard.querySelectorAll('a')
                    all_links.forEach((a) => {
                        a.onclick = () => setCardData(cardID)
                    })
                    newcard.querySelector('#inform').id = `inform${cardID}`
                    newcard.querySelector('#save').onclick = () => saveCard(cardID)


                    document.getElementById("eachCard").appendChild(newcard);

                })
            })

    }
    if (travel == "true") {
        //read the data from the documents in collection, that category field value same as travel, and limit 2 documents from the documents array
        db.collection(collection).where("category", "==", "travel").limit(2).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);

                    if (saved_cards && saved_cards.includes(cardID)) {
                        newcard.querySelector('#save').innerHTML = "Saved"
                    }
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                    all_links = newcard.querySelectorAll('a')
                    all_links.forEach((a) => {
                        a.onclick = () => setCardData(cardID)
                    })
                    newcard.querySelector('#inform').id = `inform${cardID}`
                    newcard.querySelector('#save').onclick = () => saveCard(cardID)


                    document.getElementById("eachCard").appendChild(newcard);

                })
            })

    }
    //read the data from the documents in collection, that annual_fee field value lower than annual_fee, and limit 2 documents from the documents array
    db.collection(collection).where("annual_fee", "<", annual_fee).orderBy("annual_fee").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards && saved_cards.includes(cardID)) {
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })
                newcard.querySelector('#inform').id = `inform${cardID}`
                newcard.querySelector('#save').onclick = () => saveCard(cardID)


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    //read the data from the documents in collection, that extra_fee field value smaller than extra_fee, and limit 2 documents from the documents array
    db.collection(collection).where("extra_fee", "<", extra_fee).orderBy("extra_fee").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards && saved_cards.includes(cardID)) {
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })
                newcard.querySelector('#inform').id = `inform${cardID}`
                newcard.querySelector('#save').onclick = () => saveCard(cardID)


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    //read the data from the documents in collection, that category field value same as role, and limit 2 documents from the documents array
    db.collection(collection).where("welcome_bonus", ">", welcome_bonus).orderBy("welcome_bonus", "desc").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards && saved_cards.includes(cardID)) {
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card-img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })
                newcard.querySelector('#inform').id = `inform${cardID}`
                newcard.querySelector('#save').onclick = () => saveCard(cardID)


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
}