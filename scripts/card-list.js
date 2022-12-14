let urlParams = new URLSearchParams(window.location.search)
let currentUser
let saved_cards

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // read the value in saved_cards filed in current user document
        currentUser = db.collection("users").doc(user.uid)
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

function saveCard(id){
    //set(write) the id value to saved_cards field
    currentUser.set({
        saved_cards: firebase.firestore.FieldValue.arrayUnion(id)
    },{
        merge:true
    })
    //prompt user after user click save button
    document.getElementById(`inform${id}`).innerHTML = "Saved"
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("cardTemplate");
    type = urlParams.get("type")
    // if url params contain type, get the matched type cards from firebase
    // else get all cards data from firebase
    if (type) {
        //read the documents that category field value same as type
        db.collection(collection).where("category", "==", type).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                //if the card already saved by user, then change "save" to "saved" to prompt user
                if (saved_cards && saved_cards.includes(cardID)){
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
    else {
        //read all the documents in the collection
        db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);

                //if the card already saved by user, then change "save" to "saved" to prompt user
                if (saved_cards && saved_cards.includes(cardID)){
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


}

// ---------------------------write data to firebase(Done!!!! Do not call again!)----------------------
// 5 types of credit cards: Travel, Student, Business, low interest and Cash back
//write documents to credit_cards collection
function writeCards() {
    //create the credit card collection and the card document
    let cardsRef = db.collection("credit_cards");

    cardsRef.add({
        code: "RBC001", // for img, should be bank+number
        name: "RBC Travel-related Make-up Card",
        category: "travel",
        bank: "RBC",
        description: "5x points on travel purchased through this card, excluding hotel purchases that qualify for the $50 Annual Ultimate Rewards Hotel Credit. 3x points on select streaming services and online grocery purchases",
        interest_rate: 16.99,
        reward: "1 point per $1 spent on all other purchases \n2x points on all other travel",
        annual_fee: 120,
        welcome_bonus: 100,
        extra_fee: 25,
        benefit: "Earn 60,000 Bonus Points after you spend $4,000 on purchases in the first 3 months from account opening.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "RBC002", // for img, should be bank+number
        name: "RBC Cash Back Make-up Card",
        category: "cash_back",
        bank: "RBC",
        description: "Get Unlimited Cash Back on Your Purchases, plus your rewards accumulate automatically, so tracking is hassle-free. Link your card and instantly save 3??/L on fuel and always earn 20% more Petro-Points at Petro-Canada. Get $0 delivery fees for 12 months from DoorDash",
        interest_rate: 29.99,
        reward: "Earn up to 1.5% cash back on your spending",
        annual_fee: 99,
        welcome_bonus: 25,
        extra_fee: 50,
        benefit: "Add-on Travel Insurance.\nRBC Road Assist.\nBalanceProtector Max Insurance.\nIdentity Theft & Credit Protection",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "RBC003", // for img, should be bank+number
        name: "RBC Low Interest Make-up Card",
        category: "low_interest",
        bank: "RBC",
        description: "If you choose to carry a balance on your card, the low 12.99% interest rate ??? on purchases and cash advances - lets you save on interest. Load personalized offers for great brands before you shop to get cash savings or to earn bonus points faster.",
        interest_rate: 12.99,
        reward: "N/A",
        annual_fee: 20,
        welcome_bonus: 0,
        extra_fee: 0,
        benefit: "Instant Fuel Savings at Petro-Canada.\nEarn more Be Well points at Rexall.\nGet $0 delivery fees for 3 months from DoorDash",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "RBC004", // for img, should be bank+number
        name: "RBC Student-related make-up card",
        category: "student",
        bank: "RBC",
        description: "Enjoy 6,000 points upon approval. Pay With Points Redeem your Avion points to pay bills, your credit card balance or even send money to friends with Interac e-Transfer. Minimum redemption is only $10, so you can use your points where you need them most.",
        interest_rate: 19.99,
        reward: "Earn 1.5X points for every $1 spent on groceries, rides, gas, streaming, subscriptions, digital gaming and more.",
        annual_fee: 0,
        welcome_bonus: 50,
        extra_fee: 0,
        benefit: "No annual fee. Purchase Security and Extended Warranty Insurance",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "RBC005", // for img, should be bank+number
        name: "RBC Business-related make-up card",
        category: "business",
        bank: "RBC",
        description: "The benefits of a premium rewards program that gives your business the flexibility to redeem for travel as well as merchandise, gift cards or to pay back with points. A built-in suite of premium insurance coverage. Less than 5 cards in their expense program. To simplify accounting, employee reimbursement, and identify tax-deductible expenses",
        interest_rate: 13.99,
        reward: "Earn 1 point for every $1 spent in net purchases with your card",
        annual_fee: 150,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Combine the Avion points earned from all your employees' Business Platinum cards into one account, and pool your points between your business and personal Avion cards",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "TD001", // for img, should be bank+number
        name: "TD Travel-related Make-up Card",
        category: "travel",
        bank: "TD",
        description: "5x points on travel purchased through this card, excluding hotel purchases that qualify for the $50 Annual Ultimate Rewards Hotel Credit. 3x points on select streaming services and online grocery purchases",
        interest_rate: 16.99,
        reward: "1 point per $1 spent on all other purchases \n2x points on all other travel",
        annual_fee: 120,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Earn 60,000 Bonus Points after you spend $4,000 on purchases in the first 3 months from account opening.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "TD002", // for img, should be bank+number
        name: "TD Cash Back Make-up Card",
        category: "cash_back",
        bank: "TD",
        description: "Get Unlimited Cash Back on Your Purchases, plus your rewards accumulate automatically, so tracking is hassle-free. Link your card and instantly save 3??/L on fuel and always earn 20% more Petro-Points at Petro-Canada. Get $0 delivery fees for 12 months from DoorDash",
        interest_rate: 29.99,
        reward: "Earn up to 1.5% cash back on your spending",
        annual_fee: 99,
        welcome_bonus: 25,
        extra_fee: 50,
        benefit: "Add-on Travel Insurance.\nRBC Road Assist.\nBalanceProtector Max Insurance.\nIdentity Theft & Credit Protection",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "TD003", // for img, should be bank+number
        name: "TD Low Interest Make-up Card",
        category: "low_interest",
        bank: "TD",
        description: "If you choose to carry a balance on your card, the low 12.99% interest rate ??? on purchases and cash advances - lets you save on interest. Load personalized offers for great brands before you shop to get cash savings or to earn bonus points faster.",
        interest_rate: 12.99,
        reward: "N/A",
        annual_fee: 20,
        welcome_bonus: 0,
        extra_fee: 0,
        benefit: "Instant Fuel Savings at Petro-Canada.\nEarn more Be Well points at Rexall.\nGet $0 delivery fees for 3 months from DoorDash",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "TD004", // for img, should be bank+number
        name: "TD Student-related make-up card",
        category: "student",
        bank: "TD",
        description: "Enjoy 6,000 points upon approval. Pay With Points Redeem your Avion points to pay bills, your credit card balance or even send money to friends with Interac e-Transfer. Minimum redemption is only $10, so you can use your points where you need them most.",
        interest_rate: 19.99,
        reward: "Earn 1.5X points for every $1 spent on groceries, rides, gas, streaming, subscriptions, digital gaming and more.",
        annual_fee: 0,
        welcome_bonus: 50,
        extra_fee: 0,
        benefit: "No annual fee. Purchase Security and Extended Warranty Insurance",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "TD005", // for img, should be bank+number
        name: "TD Business-related make-up card",
        category: "business",
        bank: "TD",
        description: "The benefits of a premium rewards program that gives your business the flexibility to redeem for travel as well as merchandise, gift cards or to pay back with points. A built-in suite of premium insurance coverage. Less than 5 cards in their expense program. To simplify accounting, employee reimbursement, and identify tax-deductible expenses",
        interest_rate: 19.99,
        reward: "Earn 1 point for every $1 spent in net purchases with your card",
        annual_fee: 120,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Combine the Avion points earned from all your employees' Business Platinum cards into one account, and pool your points between your business and personal Avion cards",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "BMO001", // for img, should be bank+number
        name: "BMO Travel-related Make-up Card",
        category: "travel",
        bank: "BMO",
        description: "5x points on travel purchased through this card, excluding hotel purchases that qualify for the $50 Annual Ultimate Rewards Hotel Credit. 3x points on select streaming services and online grocery purchases",
        interest_rate: 16.99,
        reward: "1 point per $1 spent on all other purchases \n2x points on all other travel",
        annual_fee: 120,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Earn 60,000 Bonus Points after you spend $4,000 on purchases in the first 3 months from account opening.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "BMO002", // for img, should be bank+number
        name: "BMO Cash Back Make-up Card",
        category: "cash_back",
        bank: "BMO",
        description: "Get Unlimited Cash Back on Your Purchases, plus your rewards accumulate automatically, so tracking is hassle-free. Link your card and instantly save 3??/L on fuel and always earn 20% more Petro-Points at Petro-Canada. Get $0 delivery fees for 12 months from DoorDash",
        interest_rate: 29.99,
        reward: "Earn up to 1.5% cash back on your spending",
        annual_fee: 99,
        welcome_bonus: 25,
        extra_fee: 50,
        benefit: "Add-on Travel Insurance.\nRBC Road Assist.\nBalanceProtector Max Insurance.\nIdentity Theft & Credit Protection",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "BMO003", // for img, should be bank+number
        name: "BMO Low Interest Make-up Card",
        category: "low_interest",
        bank: "BMO",
        description: "If you choose to carry a balance on your card, the low 12.99% interest rate ??? on purchases and cash advances - lets you save on interest. Load personalized offers for great brands before you shop to get cash savings or to earn bonus points faster.",
        interest_rate: 12.99,
        reward: "N/A",
        annual_fee: 20,
        welcome_bonus: 0,
        extra_fee: 0,
        benefit: "Instant Fuel Savings at Petro-Canada.\nEarn more Be Well points at Rexall.\nGet $0 delivery fees for 3 months from DoorDash",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "BMO004", // for img, should be bank+number
        name: "BMO Student-related make-up card",
        category: "student",
        bank: "BMO",
        description: "Enjoy 6,000 points upon approval. Pay With Points Redeem your Avion points to pay bills, your credit card balance or even send money to friends with Interac e-Transfer. Minimum redemption is only $10, so you can use your points where you need them most.",
        interest_rate: 19.99,
        reward: "Earn 1.5X points for every $1 spent on groceries, rides, gas, streaming, subscriptions, digital gaming and more.",
        annual_fee: 0,
        welcome_bonus: 50,
        extra_fee: 0,
        benefit: "No annual fee. Purchase Security and Extended Warranty Insurance",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "BMO005", // for img, should be bank+number
        name: "BMO Business-related make-up card",
        category: "business",
        bank: "BMO",
        description: "The benefits of a premium rewards program that gives your business the flexibility to redeem for travel as well as merchandise, gift cards or to pay back with points. A built-in suite of premium insurance coverage. Less than 5 cards in their expense program. To simplify accounting, employee reimbursement, and identify tax-deductible expenses",
        interest_rate: 19.99,
        reward: "Earn 1 point for every $1 spent in net purchases with your card",
        annual_fee: 120,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Combine the Avion points earned from all your employees' Business Platinum cards into one account, and pool your points between your business and personal Avion cards",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "SC001", // for img, should be bank+number
        name: "SC Travel-related Make-up Card",
        category: "travel",
        bank: "SC",
        description: "5x points on travel purchased through this card, excluding hotel purchases that qualify for the $50 Annual Ultimate Rewards Hotel Credit. 3x points on select streaming services and online grocery purchases",
        interest_rate: 16.99,
        reward: "1 point per $1 spent on all other purchases \n2x points on all other travel",
        annual_fee: 120,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Earn 60,000 Bonus Points after you spend $4,000 on purchases in the first 3 months from account opening.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "SC002", // for img, should be bank+number
        name: "SC Cash Back Make-up Card",
        category: "cash_back",
        bank: "SC",
        description: "Get Unlimited Cash Back on Your Purchases, plus your rewards accumulate automatically, so tracking is hassle-free. Link your card and instantly save 3??/L on fuel and always earn 20% more Petro-Points at Petro-Canada. Get $0 delivery fees for 12 months from DoorDash",
        interest_rate: 29.99,
        reward: "Earn up to 1.5% cash back on your spending",
        annual_fee: 99,
        welcome_bonus: 25,
        extra_fee: 50,
        benefit: "Add-on Travel Insurance.\nRBC Road Assist.\nBalanceProtector Max Insurance.\nIdentity Theft & Credit Protection",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "SC003", // for img, should be bank+number
        name: "SC Low Interest Make-up Card",
        category: "low_interest",
        bank: "SC",
        description: "If you choose to carry a balance on your card, the low 12.99% interest rate ??? on purchases and cash advances - lets you save on interest. Load personalized offers for great brands before you shop to get cash savings or to earn bonus points faster.",
        interest_rate: 12.99,
        reward: "N/A",
        annual_fee: 20,
        welcome_bonus: 0,
        extra_fee: 0,
        benefit: "Instant Fuel Savings at Petro-Canada.\nEarn more Be Well points at Rexall.\nGet $0 delivery fees for 3 months from DoorDash",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "SC004", // for img, should be bank+number
        name: "SC Student-related make-up card",
        category: "student",
        bank: "SC",
        description: "Enjoy 6,000 points upon approval. Pay With Points Redeem your Avion points to pay bills, your credit card balance or even send money to friends with Interac e-Transfer. Minimum redemption is only $10, so you can use your points where you need them most.",
        interest_rate: 19.99,
        reward: "Earn 1.5X points for every $1 spent on groceries, rides, gas, streaming, subscriptions, digital gaming and more.",
        annual_fee: 0,
        welcome_bonus: 50,
        extra_fee: 0,
        benefit: "No annual fee. Purchase Security and Extended Warranty Insurance",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "SC005", // for img, should be bank+number
        name: "SC Business-related make-up card",
        category: "business",
        bank: "SC",
        description: "The benefits of a premium rewards program that gives your business the flexibility to redeem for travel as well as merchandise, gift cards or to pay back with points. A built-in suite of premium insurance coverage. Less than 5 cards in their expense program. To simplify accounting, employee reimbursement, and identify tax-deductible expenses",
        interest_rate: 18.99,
        reward: "Earn 1 point for every $1 spent in net purchases with your card",
        annual_fee: 99,
        welcome_bonus: 99,
        extra_fee: 25,
        benefit: "Combine the Avion points earned from all your employees' Business Platinum cards into one account, and pool your points between your business and personal Avion cards",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "CIB001", // for img, should be bank+number
        name: "CIB Travel-related Make-up Card",
        category: "travel",
        bank: "CIB",
        description: "5x points on travel purchased through this card, excluding hotel purchases that qualify for the $50 Annual Ultimate Rewards Hotel Credit. 3x points on select streaming services and online grocery purchases",
        interest_rate: 15.99,
        reward: "1 point per $1 spent on all other purchases \n2x points on all other travel",
        annual_fee: 110,
        welcome_bonus: 0,
        extra_fee: 25,
        benefit: "Earn 60,000 Bonus Points after you spend $4,000 on purchases in the first 3 months from account opening.",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "CIB002", // for img, should be bank+number
        name: "CIB Cash Back Make-up Card",
        category: "cash_back",
        bank: "CIB",
        description: "Get Unlimited Cash Back on Your Purchases, plus your rewards accumulate automatically, so tracking is hassle-free. Link your card and instantly save 3??/L on fuel and always earn 20% more Petro-Points at Petro-Canada. Get $0 delivery fees for 12 months from DoorDash",
        interest_rate: 28.99,
        reward: "Earn up to 1.5% cash back on your spending",
        annual_fee: 89,
        welcome_bonus: 25,
        extra_fee: 50,
        benefit: "Add-on Travel Insurance.\nRBC Road Assist.\nBalanceProtector Max Insurance.\nIdentity Theft & Credit Protection",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "CIB003", // for img, should be bank+number
        name: "CIB Low Interest Make-up Card",
        category: "low_interest",
        bank: "CIB",
        description: "If you choose to carry a balance on your card, the low 12.99% interest rate ??? on purchases and cash advances - lets you save on interest. Load personalized offers for great brands before you shop to get cash savings or to earn bonus points faster.",
        interest_rate: 13.99,
        reward: "N/A",
        annual_fee: 200,
        welcome_bonus: 10,
        extra_fee:10,
        benefit: "Instant Fuel Savings at Petro-Canada.\nEarn more Be Well points at Rexall.\nGet $0 delivery fees for 3 months from DoorDash",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "CIB004", // for img, should be bank+number
        name: "CIB Student-related make-up card",
        category: "student",
        bank: "CIB",
        description: "Enjoy 6,000 points upon approval. Pay With Points Redeem your Avion points to pay bills, your credit card balance or even send money to friends with Interac e-Transfer. Minimum redemption is only $10, so you can use your points where you need them most.",
        interest_rate: 19.99,
        reward: "Earn 1.5X points for every $1 spent on groceries, rides, gas, streaming, subscriptions, digital gaming and more.",
        annual_fee: 20,
        welcome_bonus: 250,
        extra_fee: 0,
        benefit: "No annual fee. Purchase Security and Extended Warranty Insurance",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    cardsRef.add({
        code: "CIB005", // for img, should be bank+number
        name: "CIB Business-related make-up card",
        category: "business",
        bank: "CIB",
        description: "The benefits of a premium rewards program that gives your business the flexibility to redeem for travel as well as merchandise, gift cards or to pay back with points. A built-in suite of premium insurance coverage. Less than 5 cards in their expense program. To simplify accounting, employee reimbursement, and identify tax-deductible expenses",
        interest_rate: 18.99,
        reward: "Earn 1 point for every $1 spent in net purchases with your card",
        annual_fee: 100,
        welcome_bonus: 10,
        extra_fee: 50,
        benefit: "Combine the Avion points earned from all your employees' Business Platinum cards into one account, and pool your points between your business and personal Avion cards",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

}