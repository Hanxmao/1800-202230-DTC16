let currentUser

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        getSaved(user)
    } else {
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});

function setCardData(id) {
    localStorage.setItem('cardID', id);
}


function removeCard(code){
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayRemove(code)
    },{
        merge:true
    })
    document.getElementById(`inform${code}`).innerHTML = 'Removed!'
    
}

function getSaved(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var saved_cards = userDoc.data().saved_cards;
            console.log(saved_cards);

            let cardTemplate = document.getElementById("cardTemplate");
            saved_cards.forEach(cardID => {
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

                        newcard.querySelector('#remove').onclick = () => removeCard(code)
                        newcard.querySelector('#inform').id = `inform${code}`
            
            
                        document.getElementById("eachCard").appendChild(newcard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}