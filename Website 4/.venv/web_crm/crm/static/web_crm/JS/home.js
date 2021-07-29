try{
    $(document).ready(function() {
    $(window).resize(function(){
        if($(window).width() > 1000){
            document.getElementById('nav-checkbox').checked = false;
            nav_func();
        }
    });
});

    $(window).scroll(function () {
    if($(window).scrollTop() > 0){
        $('.nav').css('background', 'white');
        $('.nav-links a').css('color', 'black');
    }else{
        $('.nav').css('background', 'white');
        $('.nav-links a').css('color', 'black');
    }
    $('#login-btn').css('color', 'white');
    $('#register-btn').css('color', 'white');
});

$(document).ready(function() {
  $('#menu-bar').bind('click', function(){
    document.getElementById('nav-checkbox').checked = true;
    nav_func();
  });

  $('#menu-cancel').bind('click', function(){
    document.getElementById('nav-checkbox').checked = false;
    nav_func();
  });

});

function nav_func(){
    if(document.getElementById('nav-checkbox').checked){
        $('#menu-bar').css('display', 'none');
        $('#menu-cancel').css('display', 'block');
    }else{
      $('#menu-bar').css('display', 'block');
      $('#menu-cancel').css('display', 'none');
    }
}

function requestDemo(){
    try{
        var email = document.getElementById('demo-mail').value;
        $.ajax({
            url: 'demo',
            type: 'POST',
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                email: email,
            },
            success: function(response){
                var message = response.data.message;
                if(message.toString() === 'success'){
                    document.getElementById('demo-btn').disabled = true;
                    document.getElementById('demo-btn').style.cursor = 'no-drop';
                    document.getElementById('demo-btn').innerText = 'Demo Requested';
                    document.getElementById('demo-btn').style.background = 'red';
                }
            }
        });
    }catch(err){}
}
}catch(err){}