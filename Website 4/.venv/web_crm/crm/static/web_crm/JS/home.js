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
        $('.nav').css('background', 'rgb(0 0 0 / 10%)');
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

}catch(err){
    alert(err);
}
