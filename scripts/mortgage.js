

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
            url: 'https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=200000&interest_rate=3.5&duration_years=30',
            headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
            contentType: 'application/json',
            success: function (result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    })


}



$(document).ready(setup)