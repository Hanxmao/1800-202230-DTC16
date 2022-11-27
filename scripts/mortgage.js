setup = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $("#convert").click(() => {
                let home_value = $('#home_value').val()
                let downpayment = $("#downpayment").val()
                let interest_rate = $('#interest_rate').val()
                let duration_years = $('#duration_years').val()
                $.ajax({
                    method: 'GET',
                    //send the user input data to API through url params
                    url: `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${home_value}&downpayment=${downpayment}&interest_rate=${interest_rate}&duration_years=${duration_years}`,
                    headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
                    contentType: 'application/json',
                    success: function (result) {
                        //change the #result div inner html to the result from the array that API respond
                        // array name result, keys for payment is monthly_payment and annual_payment
                        $('#result').html('Monthly payment: $' + result.monthly_payment["total"] + '<br>Annual payment: $' + result.annual_payment['total'])
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            })
        } else {
            //alert user and redirect to login page if user is not login
            alert("Please Log In to process the page.");
            window.location.href = 'login.html'
        }
    });
}

$(document).ready(setup)