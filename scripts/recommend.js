let urlParams = new URLSearchParams(window.location.search)
annual_fee = urlParams.get("annual_fee")
extra_fee = urlParams.get("extra_fee")
welcome_bonus = urlParams.get("welcome_bonus")
travel = urlParams.get("travel")
role = urlParams.get("role")
console.log(role);
type = urlParams.get("type")

function displayCards(collection) {
    if(role != "none"){
        db.collection(collection).where("category", "==", role).limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);
                let randReview = Math.floor(Math.random() * 120)
                let randRating = Math.ceil(Math.random() * 5)
                console.log(cardID)

                newcard.querySelector('#rating').innerHTML = randRating;
                newcard.querySelector('#review').innerHTML = randReview;
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    }
    if (type != "none") {
        db.collection(collection).where("category", "==", type).limit(1).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);
                    let randReview = Math.floor(Math.random() * 120)
                    let randRating = Math.ceil(Math.random() * 5)
                    console.log(cardID)

                    newcard.querySelector('#rating').innerHTML = randRating;
                    newcard.querySelector('#review').innerHTML = randReview;
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                    all_links = newcard.querySelectorAll('a')
                    all_links.forEach((a) => {
                        a.onclick = () => setCardData(cardID)
                    })


                    document.getElementById("eachCard").appendChild(newcard);

                })
            })

    }

    if (travel == "true") {
        db.collection(collection).where("category", "==", "travel").limit(1).get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().name;
                    var description = doc.data().description;
                    var cardID = doc.data().code;
                    let newcard = cardTemplate.content.cloneNode(true);
                    let randReview = Math.floor(Math.random() * 120)
                    let randRating = Math.ceil(Math.random() * 5)
                    console.log(cardID)

                    newcard.querySelector('#rating').innerHTML = randRating;
                    newcard.querySelector('#review').innerHTML = randReview;
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('#description').innerHTML = description;
                    newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                    all_links = newcard.querySelectorAll('a')
                    all_links.forEach((a) => {
                        a.onclick = () => setCardData(cardID)
                    })


                    document.getElementById("eachCard").appendChild(newcard);

                })
            })

    }

    db.collection(collection).where("annual_fee", "<", annual_fee).limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);
                let randReview = Math.floor(Math.random() * 120)
                let randRating = Math.ceil(Math.random() * 5)
                console.log(cardID)

                newcard.querySelector('#rating').innerHTML = randRating;
                newcard.querySelector('#review').innerHTML = randReview;
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    db.collection(collection).where("extra_fee", "<", extra_fee).limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);
                let randReview = Math.floor(Math.random() * 120)
                let randRating = Math.ceil(Math.random() * 5)
                console.log(cardID)

                newcard.querySelector('#rating').innerHTML = randRating;
                newcard.querySelector('#review').innerHTML = randReview;
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
    db.collection(collection).where("welcome_bonus", ">", welcome_bonus+1).limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var description = doc.data().description;
                var cardID = doc.data().code;
                let newcard = cardTemplate.content.cloneNode(true);
                let randReview = Math.floor(Math.random() * 120)
                let randRating = Math.ceil(Math.random() * 5)
                console.log(cardID)

                newcard.querySelector('#rating').innerHTML = randRating;
                newcard.querySelector('#review').innerHTML = randReview;
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('#description').innerHTML = description;
                newcard.querySelector('#card-img').src = `./images/card_img${cardID[cardID.length - 1]}.svg`;
                all_links = newcard.querySelectorAll('a')
                all_links.forEach((a) => {
                    a.onclick = () => setCardData(cardID)
                })


                document.getElementById("eachCard").appendChild(newcard);

            })
        })
}

displayCards("credit_card")