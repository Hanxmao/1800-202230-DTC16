// cardName = thisCard.name
// annual_fee = thisCard.annual_fee
// summary = thisCard.description
// interest_rate = thisCard.interest_rate
// welcome_bonus = thisCard.welcome_bonus
// extra_fee = thisCard.extra_fee
// reward = thisCard.reward
// benefit = thisCard.benefit

$('#cardtype1').change(()=>{
    console.log( $("#cardtype1 option:selected").val());
    cardName1 =$("#cardtype1 option:selected").val()
    db.collection('credit_card').where('name', '==', cardName1)
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
$('#cardtype2').change(()=>{
    console.log( $("#cardtype2 option:selected").val());
    cardName2 =$("#cardtype2 option:selected").val()
    db.collection('credit_card').where('name', '==', cardName2)
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