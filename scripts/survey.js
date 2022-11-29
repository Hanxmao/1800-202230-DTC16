firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let annual_fee = $("#annual_fee").val()
        let extra_fee = $("#extra_fee").val()
        let welcome_bonus = $("#welcome_bonus").val()

        //the number above the range type input will change dynamically with the range changed and update the variables value.
        $(document).on('input', '#annual_fee', function () {
            $('#annual_output').html($(this).val());
            annual_fee = $(this).val()
        });
        $(document).on('input', '#extra_fee', function () {
            $('#extra_output').html($(this).val());
            extra_fee = $(this).val()
        });
        $(document).on('input', '#welcome_bonus', function () {
            $('#welcome_output').html($(this).val());
            welcome_bonus = $(this).val()
        });

        $("#submit").click(() => {
            let url_params = ""
            // grab only the input values that has been checked
            role = $('input[name="role"]:checked').val()
            travel = $('input[name="travel"]:checked').val()
            type = $('input[name="type"]:checked').val()
            //store the input values in url params and pass them to recommend page
            url_params += `&annual_fee=${annual_fee}` + `&extra_fee=${extra_fee}` + `&welcome_bonus=${welcome_bonus}` + `&travel=${travel}` + `&role=${role}` + `&type=${type}`
            $('#submit').attr("href", `./recommend.html?${url_params}`)
        })
    } else {
        //alert user and redirect to login page if user is not login
        alert("Please Log In to process the page.");
        window.location.href = 'login.html'
    }
});