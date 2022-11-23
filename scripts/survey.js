$(document).on('input', '#annual_fee', function() {
    $('#annual_output').html( $(this).val());
    annual_fee = $(this).val()
});
$(document).on('input', '#extra_fee', function() {
    $('#extra_output').html( $(this).val());
    extra_fee = $(this).val()
});
$(document).on('input', '#welcome_bonus', function() {
    $('#welcome_output').html( $(this).val());
    welcome_bonus = $(this).val()
});

$("#submit").click(()=>{
    let url_params = ""
    role = $('input[name="role"]:checked').val()
    travel = $('input[name="travel"]:checked').val()
    type = $('input[name="type"]:checked').val()
    url_params += `&annual_fee=${annual_fee}` + `&extra_fee=${extra_fee}` + `&welcome_bonus=${welcome_bonus}` + `&travel=${travel}` + `&role=${role}` + `&type=${type}`
    console.log(url_params);
    $('#submit').attr("href", `./recommend.html?${url_params}`)

})
