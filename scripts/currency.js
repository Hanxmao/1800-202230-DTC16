setup = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //After user click the convert button, the call back function will catch the value from the inputs and  seen to the API through ajax and get the data from the json data that API respond
            $("#convert").click(()=>{
                let fromCurrency = $('#fromCurrency').val()
                let toCurrency = $("#toCurrency").val()
                let amount = $('#amount').val()
                $.ajax({
                    method: 'GET',
                    // send the user input values to the API url through url params
                    url: `https://api.api-ninjas.com/v1/convertcurrency?want=${fromCurrency}&have=${toCurrency}&amount=${amount}`,
                    headers: { 'X-Api-Key': 'bqWH6covDtf0E84LhDpQqw==D0VqpsDFkGSWCC98' },
                    contentType: 'application/json',
                    success: function (result) {
                        //get the data from the respond json array, the key for the amount after converted is called "new_amount" 
                        $('#result').html(`${amount} ${fromCurrency} = ${result.new_amount} ${toCurrency}`)
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