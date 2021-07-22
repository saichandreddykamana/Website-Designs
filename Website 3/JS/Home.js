if($(window).width() <= 1000){
    showHamburgerMenu();
}

$(window).scroll(function(){
    if($(window).scrollTop() >= 50) {
        showHamburgerMenu();
    }else{
        if($(window).width() > 1000){
            showNavMenu();
        }
    }
});

$( window ).resize(function() {
    if($(window).width() <= 1000){
        showHamburgerMenu();
        hideAllMenuList();
    }else{
        showNavMenu();
        $('.side-menu').css('display','none');
    }
});

$('.menu').hover(function(){
    showMenuList($(this).index() - 1);
    hideMenuList($(this).index() - 1);
});

$('.body-container').mouseover(function(){
    hideAllMenuList();
});

function showHamburgerMenu(){
    $('.nav-menu').css('display', 'none');
    $('nav').css('border-bottom','none');
    $('.nav-hamburger-menu').css('display', 'block');
    $('.nav-hamburger-menu').addClass('slide-in'); 
}

function showNavMenu(){
    $('.nav-menu').css('display', 'flex');
    $('nav').css('border-bottom','1px solid #f7f1f1');
    $('.nav-hamburger-menu').css('display','none');
    $('.nav-menu').addClass('slide-in'); 
}

function showMenuList(index){
    $('.menu-list').eq(index).css('display','flex');
    $('.menu-list').eq(index).addClass('slide-in');
}

function hideMenuList(index){
    $('.menu-list').not(':eq('+ index +')').css('display','none');
    $('.menu-list').not(':eq('+ index +')').removeClass('slide-in');
}

function hideAllMenuList(){
    $('.menu-list').css('display','none');
    $('.menu-list').removeClass('fade-in');
}

$('.nav-hamburger-menu').bind('click', function(){
    $('.side-menu').css('display','block');
    $('.side-menu').addClass('slide-right');
    $('.nav-hamburger-menu').css('display', 'none');
});

$('.close').bind('click', function(){
    $('.side-menu').css('display','none');
    $('.nav-hamburger-menu').css('display', 'block');
});