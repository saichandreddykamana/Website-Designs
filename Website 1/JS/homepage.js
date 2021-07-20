$(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
     $('nav').removeClass('navbar');
     $('.main-page-container-one').css('padding-top','30px');
    } else {
            $('nav').addClass('navbar');
    }
});

$('#menu-icon').bind("click", function(){
    if($('nav').hasClass('navbar')){
        $('nav').removeClass('navbar');
        $('.main-page-container-one').css('padding-top','100px');
    }else{
        $('nav').addClass('navbar');
        $('.main-page-container-one').css('padding-top','30px');
    }
});

$(".list-item").bind("click", function(){
    try{
        var items = $(".list-item");
        var item_index = items.index($(this));
        var item_descriptions = document.getElementsByClassName('list-item-description');
        item_descriptions[item_index].classList.add('active');
        removeClass(item_index, item_descriptions);
    }catch(er){
    }
});

function removeClass(index, items){
    for(var i = 0 ; i < items.length; i++){
        if(i != index){
            items[i].classList.remove('active');
        }
    }
}