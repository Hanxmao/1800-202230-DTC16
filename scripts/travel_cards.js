function setCardData(id) {
    localStorage.setItem('cardID', id);
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("cardTemplate");

    db.collection(collection).where("category", "==", "travel").get()
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

displayCards("credit_card");