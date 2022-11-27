let urlParams = new URLSearchParams(window.location.search)
let annual_fee = Number(urlParams.get("annual_fee"))
let extra_fee = Number(urlParams.get("extra_fee"))
let welcome_bonus = Number(urlParams.get("welcome_bonus"))
let travel = urlParams.get("travel")
let role = urlParams.get("role")
let type = urlParams.get("type")

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        currentUser.get().then(userDoc => {
            saved_cards = userDoc.data().saved_cards;
        })
        displayCards("credit_card");
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
  });

function setCardData(id) {
    localStorage.setItem('cardID', id);
}

function saveCard(id){
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayUnion(id)
    },{
        merge:true
    })
    document.getElementById(`inform${id}`).innerHTML = "Saved"
}

function displayCards(collection) {
    if(role != "none"){
        db.collection(collection).where("category", "==", role).limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);
                
                //if the card already saved by user, then change "save" to "saved" to prompt user
                if (saved_cards.includes(cardID)){
                    newcard.querySelector('#save').innerHTML = "Saved"
                }

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
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
        db.collection(collection).where("category", "==", type).limit(2).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);
    
                    if (saved_cards.includes(cardID)){
                        newcard.querySelector('#save').innerHTML = "Saved"
                    }
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
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
        db.collection(collection).where("category", "==", "travel").limit(2).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);
    
                    if (saved_cards.includes(cardID)){
                        newcard.querySelector('#save').innerHTML = "Saved"
                    }
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
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

    db.collection(collection).where("annual_fee", "<", annual_fee).orderBy("annual_fee").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards.includes(cardID)){
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })
                newcard.querySelector('#inform').id = `inform${cardID}`
                newcard.querySelector('#save').onclick = () => saveCard(cardID)


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    db.collection(collection).where("extra_fee", "<", extra_fee).orderBy("extra_fee").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards.includes(cardID)){
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })
                newcard.querySelector('#inform').id = `inform${cardID}`
                newcard.querySelector('#save').onclick = () => saveCard(cardID)


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    db.collection(collection).where("welcome_bonus", ">", welcome_bonus).orderBy("welcome_bonus", "desc").limit(2).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                if (saved_cards.includes(cardID)){
                    newcard.querySelector('#save').innerHTML = "Saved"
                }
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
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



