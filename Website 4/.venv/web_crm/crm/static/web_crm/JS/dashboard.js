try{
    $('.nav-expand-btn').click(function(){expandNav();});
}catch(err){
    alert(err);
}

function expandNav(){
    try{
        var nav_width = $('.side-nav').width() == '76.8' ? '230.4' : '76.8';
        $('.side-nav').animate({width:nav_width});
        $('.nav-expand-btn').animate({width:nav_width});
        console.log(nav_width);
        console.log($('.side-nav').width());
        $('.side-nav').width() == '76.8' ?  expandItems() : shrinkItems();
    }catch(err){
        alert(err);
    }
}

function expandItems(){
    try{
        $('#right').css({transform: 'rotate(180deg)'});
        $('.side-nav ul li').not('.nav-expand-btn').css('text-align', 'left');
        $('.nav-description').delay(200).fadeIn();
    }catch(err){
        alert(err);
    }
}

function shrinkItems(){
    try{
        $('#right').css({transform: 'rotate(0deg)'});
        $('.side-nav ul li').css('text-align', 'center');
        $('.nav-description').hide(50);
    }catch(err){
        alert(err);
    }
}