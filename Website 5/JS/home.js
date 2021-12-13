function showBox(div){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementById(div).style.display = 'block';
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal){
        modal.style.display = "none";
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'none';
    }
}