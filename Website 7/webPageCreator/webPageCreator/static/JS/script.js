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
