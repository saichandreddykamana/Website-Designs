$('#demo-form').on('submit', function(e){
    e.preventDefault();
      $.ajax({
           type : "POST",
           url: "schedule_demo/",
           data: {
            customer_mail : $('#customer-mail').val(),
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
           },
           
           success: function(data){
            if(data.exists){
              customer = JSON.parse(data.customer_details);
              document.getElementById('demo-response').innerHTML = "<p>There is an existing demo booked with this email <br> <b>E-Mail : </b>" + customer[0].fields.customer_mail + " <br> <b>DATE : </b>" + customer[0].fields.demo_date + ".</p>";
              document.getElementById('demo-response').style.background = 'red';
            }else{
              if(data.customer_details != 'Please enter valid E-Mail Address.'){
                customer = JSON.parse(data.customer_details);
                document.getElementById('demo-response').innerHTML = "<p>demo is booked with this email <br> <b>E-Mail : </b>" + customer[0].fields.customer_mail + " <br> <b>DATE : </b>" + customer[0].fields.demo_date + ".</p>";
                document.getElementById('demo-response').style.background = 'green';
              }else{
                document.getElementById('demo-response').innerHTML = "<p>"+ data.customer_details + "</p>";
                document.getElementById('demo-response').style.background = 'red';
              }
            }
           },

           failure: function() {}
       });
});


function signInForm(action){
  var modal = document.getElementById("myModal");
      modal.style.display = "block";
  var sign_in = document.getElementById('sign-in-form');
  var register = document.getElementById('register-form');
  if(action == 'sign-in'){
    sign_in.style.display = 'block';
    register.style.display = 'none';
  }
  if(action == 'register'){
    sign_in.style.display = 'none';
    register.style.display = 'block';
  }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}