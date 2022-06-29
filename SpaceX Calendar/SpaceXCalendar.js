var all_launches = [];


// function to get all upcoming launches from spacex using API call.
function getUpcomingLaunches(){
    var request = new XMLHttpRequest(); 
        request.open('GET', 'https://api.spacexdata.com/v5/launches/upcoming'); 
        request.send();
        
        request.onload = async function() {
            if(request.status == 200){
                all_launches = JSON.parse(this.response);
                document.getElementById('all-launches').innerText = JSON.stringify(all_launches);
            }
        }
}