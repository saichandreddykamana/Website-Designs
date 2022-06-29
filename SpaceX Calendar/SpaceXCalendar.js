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
    launchDay(month.selectedIndex, month.value);
}


// function to mark the launch date in the calendar layout
function launchDay(index, month){
    for(var i = 0 ; i < all_launches.length ; i++){
        var launch = new Date(all_launches[i].date_utc);
        let launch_month = launch.getMonth();
        let launch_date = launch.getDate();
        var launch_det = all_launches[i]; 
        if(index == launch_month){
            document.getElementsByClassName('day')[launch_date - 1].style.backgroundColor = 'green';
            document.getElementsByClassName('day')[launch_date - 1].style.color = 'white';
        }
    }
}