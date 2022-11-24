firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        setup = () => {
            $("#convert").click(() => {
                let fromCurrency = $('#fromCurrency').val()
                let toCurrency = $("#toCurrency").val()
                let amount = $('#amount').val()
                // console.log("convert button");
                // console.log(fromCurrency);
                // console.log(toCurrency);
                // console.log(amount);
                $.ajax({
                    method: 'GET',
                    url: `https://api.api-ninjas.com/v1/convertcurrency?want=${fromCurrency}&have=${toCurrency}&amount=${amount}`,
                    headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
                    contentType: 'application/json',
                    success: function (result) {
                        console.log(result);
                        $('#result').html(`${amount} ${fromCurrency} = ${result.new_amount} ${toCurrency}`)
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            })

            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/interestrate',
                headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
                contentType: 'application/json',
                success: function (result) {
                    console.log(result);
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            });

        }
    } else {
        alert("Please Log In to process the page.");
    }
});

$(document).ready(setup)