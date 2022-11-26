let cardID = localStorage.getItem("cardID");
let currentUser
let saved_cards

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        currentUser.get().then(userDoc => {
            saved_cards = userDoc.data().saved_cards;
            console.log(saved_cards);})
        displayCard()

    } else {
        alert("Please Log In to process the page.");
    }
});



back_handler = () => {
    window.history.back();
}

function saveCard(id){
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayUnion(id)
    },{
        merge:true
    })
}


function displayCard(){
    db.collection('credit_card').where('code', '==', cardID)
            .get().then(card => {
                let thisCard = card.docs[0].data()
                cardName = thisCard.name
                annual_fee = thisCard.annual_fee
                summary = thisCard.description
                interest_rate = thisCard.interest_rate
                welcome_bonus = thisCard.welcome_bonus
                extra_fee = thisCard.extra_fee
                reward = thisCard.reward
                benefit = thisCard.benefit
                cardID = thisCard.code

                if (saved_cards.includes(cardID)){
                    console.log("in");
                    document.getElementById('save').innerHTML = "Saved"
                }

                document.getElementById('cardName').innerHTML = cardName
                document.getElementById('annual_fee').innerHTML = `Annual fees: ${annual_fee}`
                document.getElementById('summary').innerHTML = summary
                document.getElementById('interest_rate').innerHTML = `Interest rate: ${interest_rate}`
                document.getElementById('welcome_bonus').innerHTML = `Welcome bonus: ${welcome_bonus}`
                document.getElementById('extra_fee').innerHTML = `Extra fees: ${extra_fee}`
                document.getElementById('reward').innerHTML = reward
                document.getElementById('benefit').innerHTML = benefit
                document.getElementById('card_img').src = `../images/card_img${cardID[cardID.length - 1]}.svg`
                document.getElementById('back_btn').onclick = back_handler
                document.getElementById('save').onclick = () => saveCard(cardID)

            })
}

function writeReview() {

    let Description = document.getElementById("description").value;

    let Rating = document.querySelector('input[name="rate"]:checked').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    db.collection("reviews").add({
                        code: cardID,
                        userID: userID,
                        description: Description,
                        rating: Rating,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "card_detail.html"; //new line added
                    })
                })
        } else {
            // No user is signed in.
        }
    });
}