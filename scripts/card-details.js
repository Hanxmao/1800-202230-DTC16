let cardID = localStorage.getItem("cardID");
let currentUser
let saved_cards


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //read current user document
        currentUser = db.collection("users").doc(user.uid)
        // read the value in saved_cards filed in current user document
        currentUser.get().then(userDoc => {
            saved_cards = userDoc.data().saved_cards;
        })
        displayReview()
        displayCard()
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});



back_handler = () => {
    window.history.back();
}

function saveCard(id){
    //add(write) credit card code saved_cards field
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayUnion(id)
    },{
        merge:true
    })
    //Prompt user after they the card is saved to the saved_list
    document.getElementById(`inform`).innerHTML = "Saved"
}



function displayCard(){
    //read credit_card documents that the value of code field is same as current cardID
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
                code = thisCard.code

                //if the card already saved by user, then change "save" to "saved" to prompt user
                if (saved_cards.includes(code)){
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
                document.getElementById('card_img').src = `../images/card-img${code[code.length - 1]}.svg`
                document.getElementById('back_btn').onclick = back_handler
                document.getElementById('save').onclick = () => saveCard(code)

            })
}


function writeReview() {
    let Description = document.getElementById("description").value;
    let Rating = document.querySelector('input[name="rate"]:checked').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //read the current user uid from the document in users collection
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get(read) the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name
                    //after get(read) the data from current user, add(write) the data to reviews collection
                    db.collection("reviews").add({
                        code: cardID,
                        userID: userID,
                        description: Description,
                        rating: Rating,
                        name: userName,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "card-detail.html"; 
                    })
                })
        } else {
            //alert user and redirect to login page if user is not login
            alert("Please Log In to process the page.");
            window.location.href = 'login.html'
        }
    });
}


displayReview = ()=>{
    let cardTemplate = document.getElementById("cardTemplate");
    //get(read) the data from the documents that the value of the code field is same as cardID in reviews collection
    db.collection('reviews').where('code', '==', cardID)
    .get().then(review => {
        for(i=0;i<review.docs.length;i++){
            user = review.docs[i].data().name
            description = review.docs[i].data().description
            rating = review.docs[i].data().rating
            timestamp = review.docs[i].data().timestamp.toDate()
            let date = timestamp.toDateString()
            time = new Date(timestamp).toLocaleTimeString('en-US')

            let newcard = cardTemplate.content.cloneNode(true)
            newcard.querySelector('.user').innerHTML = user;
            newcard.querySelector('#description').innerHTML = description;
            newcard.querySelector('#rate').innerHTML = `${rating}.0`;
            newcard.querySelector('#time').innerHTML = `${time} ${date}`;

            document.getElementById("forReview").appendChild(newcard);
            
        }
    })
}

