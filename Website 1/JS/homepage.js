$(".list-item").bind("click", function(){
    try{
        var items = $(".list-item");
        var item_index = items.index($(this));
        var item_descriptions = document.getElementsByClassName('list-item-description');
        item_descriptions[item_index].classList.add('active');
        removeClass(item_index, item_descriptions);
    }catch(er){
        alert(er);
    }
});

function removeClass(index, items){
    for(var i = 0 ; i < items.length; i++){
        if(i != index){
            items[i].classList.remove('active');
        }
    }
}