let cardID = localStorage.getItem("cardID");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let cardID = localStorage.getItem("cardID");
        back_handler = () => {
            window.history.back();
        }


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

            })
    } else {
        alert("Please Log In to process the page.");
    }
});


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
                        window.location.href = "thanks.html"; //new line added
                    })
                })
        } else {
            // No user is signed in.
        }
    });
}