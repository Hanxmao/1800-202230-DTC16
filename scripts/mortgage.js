

firebase.auth().onAuthStateChanged((user) => {
    if (user) {


        setup = () => {
            $("#convert").click(() => {
                let home_value = $('#home_value').val()
                let downpayment = $("#downpayment").val()
                let interest_rate = $('#interest_rate').val()
                let duration_years = $('#duration_years').val()
                $.ajax({
                    method: 'GET',
                    url: `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${home_value}&downpayment=${downpayment}&interest_rate=${interest_rate}&duration_years=${duration_years}`,
                    headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
                    contentType: 'application/json',
                    success: function (result) {
                        console.log(result);
                        $('#result').html('Monthly payment: $' + result.monthly_payment["total"] + '<br>Annual payment: $' + result.annual_payment['total'])
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            })


        }
    } else {
        alert("Please Log In to process the page.");
    }
});

$(document).ready(setup)