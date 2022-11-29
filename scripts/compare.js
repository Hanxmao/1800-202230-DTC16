firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //call back_handler function when button being clicked
        document.getElementById('back_btn').onclick = back_handler
        //selectHandler function will trigger whenever user changed selects value
        selectHandler()
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});

//will direct to history page whenever use click the "arrow left" icon
back_handler = () => {
    window.history.back();
}

function selectHandler(){
    //whenever the two select values changed, the table fields will change to the matched data
    $('#cardtype1').change(() => {
        cardName1 = $("#cardtype1 option:selected").val()
        //read the data from documents in credit_cards collection that name field same as cardName1
        db.collection('credit_cards').where('name', '==', cardName1)
            .get().then(card => {
                let firstCard = card.docs[0].data()
                annual_fee1 = firstCard.annual_fee
                interest_rate1 = firstCard.interest_rate
                welcome_bonus1 = firstCard.welcome_bonus
                extra_fee1 = firstCard.extra_fee
                bank1 = firstCard.bank

                document.getElementById('name1').innerHTML = cardName1
                document.getElementById('bank1').innerHTML = bank1
                document.getElementById('annual_fee1').innerHTML = annual_fee1
                document.getElementById('interest_rate1').innerHTML = interest_rate1
                document.getElementById('welcome_bonus1').innerHTML = welcome_bonus1
                document.getElementById('extra_fee1').innerHTML = extra_fee1

            })
    })
    $('#cardtype2').change(() => {
        cardName2 = $("#cardtype2 option:selected").val()
        //read the data from documents in credit_cards collection that name field same as cardName2
        db.collection('credit_cards').where('name', '==', cardName2)
            .get().then(card => {
                let secondCard = card.docs[0].data()
                annual_fee2 = secondCard.annual_fee
                interest_rate2 = secondCard.interest_rate
                welcome_bonus2 = secondCard.welcome_bonus
                extra_fee2 = secondCard.extra_fee
                bank2 = secondCard.bank


                document.getElementById('name2').innerHTML = cardName2
                document.getElementById('bank2').innerHTML = bank2
                document.getElementById('annual_fee2').innerHTML = annual_fee2
                document.getElementById('interest_rate2').innerHTML = interest_rate2
                document.getElementById('welcome_bonus2').innerHTML = welcome_bonus2
                document.getElementById('extra_fee2').innerHTML = extra_fee2
            })
    })
}