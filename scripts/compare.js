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
        console.log(extra_fee1);
        

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
        console.log(extra_fee2);

    })
}) 