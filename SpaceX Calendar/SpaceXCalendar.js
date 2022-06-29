var all_launches = [];


// function to get all upcoming launches from spacex using API call.
function getUpcomingLaunches(){
    var request = new XMLHttpRequest(); 
        request.open('GET', 'https://api.spacexdata.com/v5/launches/upcoming'); 
        request.send();
        
        request.onload = async function() {
            if(request.status == 200){
                all_launches = JSON.parse(this.response);
                changeCalenderLayout();
            }
        }
}

// function to set the calendar layout
function changeCalenderLayout(){
    var month = document.getElementById('month');
    var noOfDays = 30;
    if (month.selectedIndex % 2 == 0){
        noOfDays = 31;
    }
    var calendar = "";    
    for(var i = 0 ; i < noOfDays ; i++){
        calendar += "<span class='day''>" + (i + 1) + "</span>"; 
    }
    document.getElementById('calendar-layout').innerHTML = calendar;
}