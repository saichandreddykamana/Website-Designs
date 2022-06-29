var all_launches = [];
var data = {};

// function to get all upcoming launches from spacex using API call.
function getUpcomingLaunches(){
    var request = new XMLHttpRequest(); 
        request.open('GET', 'https://api.spacexdata.com/v5/launches/upcoming'); 
        request.send();
        
        request.onload = async function() {
            if(request.status == 200){
                all_launches = JSON.parse(this.response);
                changeCalenderLayout();
                getNextLaunch();
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
            document.getElementsByClassName('day')[launch_date - 1].onclick = launchDetails;
        }
    }
}

// showing launch details when clicked on the launch date
function launchDetails(){
    var launch_date = $(this).index('.day') + 1;
    document.getElementById('launch-day-details').style.display = 'block';
    var details = '';
    for(var i = 0 ; i < all_launches.length ; i++){
        var date = new Date(all_launches[i].date_utc);
        var month = new Date(all_launches[i].date_utc);
        var selected_month = document.getElementById('month').selectedIndex;
        if(launch_date == date.getDate() && month.getMonth() == selected_month){
            document.getElementById('launch-day').style.display = 'block';
            document.getElementById('launch-day-heading').innerText =" List of " + launch_date + " - " + document.getElementById('month').value + " - 2022 Launches"; 
            var launchpad = getLaunchpad(all_launches[i].launchpad);
            details += "<p class='launch'> <b> Name : </b>" + all_launches[i].name + "<br><b> Flight Number : </b>" + all_launches[i].flight_number + "<br><b> LaunchPad : </b>" + launchpad +  "</p>";
        }
    }
    document.getElementById('launch-day-details').innerHTML = details;
}


// getting launchpad details using API call
function getLaunchpad(id){
    $.ajax({
        url: 'https://api.spacexdata.com/v4/launchpads/' + id,
        type: 'GET',
        async: false,
        success:function(result){
            data = result;
        }
    })
    return data.name;
}

// showing next launch from the data collected from API
function getNextLaunch(){
    all_launches.sort(nextLaunch);
    var launchpad = getLaunchpad(all_launches[0].launchpad);
    document.getElementById('upcoming-launch').innerHTML =  "<p class='next-launch'> <b> Name : </b>" + all_launches[0].name + "<br><b> Flight Number : </b>" + all_launches[0].flight_number + "<br><b> LaunchPad : </b>" + launchpad +  "</p>";
}


// sorting launches array to get the next launch from current date
function nextLaunch(previous, next){
    var previous_date = new Date(previous.date_utc);
    var next_date = new Date(next.date_utc);
    if(previous_date > next_date){
        return 1;
    }
    if(previous_date < next_date){
        return -1;
    }
    return 0;
}