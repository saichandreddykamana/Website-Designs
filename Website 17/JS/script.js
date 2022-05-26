function applyEffect(){
    var width = document.body.clientWidth;
    var nav_menu_list = document.getElementsByClassName('nav-list-menu')[0];
    var nav_list = document.getElementsByClassName('nav-list')[0];
    nav_menu_list.style.display = (width <= 700) ? "block": "none";
    nav_list.style.display = (width > 700) ? "block": "none";
}

function showNavbar(){
    var navbar = document.getElementById('nav-list');
    navbar.className += ' menu';
    navbar.style.display = 'block';
}

// calls applyEffects once the document is loaded
document.body.onload = applyEffect();

//calls applyEffects everytime the window is resized
window.addEventListener('resize', function(event) { applyEffect(); }, false);
