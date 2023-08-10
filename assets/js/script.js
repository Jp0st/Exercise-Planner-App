var progress = 0;
const muscleApiKey = "VyCsYgHOiN0vL3p8iudnVw==RE4npFKEtkl6LliG"
const youtubeAPIKey = "AIzaSyB7CXfci_eYgsbIQgu5gBp2JtHvXKX8JY0"
const youtubeSearchURL = "https://www.googleapis.com/youtube/v3/search"

let muscleGroup, intensity, time;

formSubmitHandler = () => {
    document.getElementById("myForm").addEventListener("submit", event => {
        event.preventDefault();
        muscleGroup = $("#muscle").val();
        intensity = $("#intensity").val();
        time = $("#time").val();
        console.log(muscleGroup, intensity, time);
        var url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleGroup}`;
        getExerciseApi(url);
    })
}
formSubmitHandler(); // John: call this function somewhere later in the code



//shows the modal window
function openModal(){
    $('#active-modal').addClass('is-active');
};

// hides the modal window
function closeModal(){
    $('#active-modal').removeClass('is-active');
};

function progressUp(){
    if(progress == 0){
        $('.progress').attr('value', '33');
        progress = progress + 33;
        console.log(progress);
    }else if(progress == 33){
        $('.progress').attr('value', '66');
        $('.progress').removeClass('is-danger');
        $('.progress').addClass('is-warning');

        progress = progress + 33;
        console.log(progress);
    }else if(progress == 66){
        $('.progress').attr('value', '100');
        $('.progress').removeClass('is-warning');
        $('.progress').addClass('is-success');
        progress = progress + 34;
        console.log(progress);
    }else{
        $('.progress').addClass('is-hidden');
        $('#progress-title').text('Workout Complete!')
    }
}



function getExerciseApi(url){
    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'VyCsYgHOiN0vL3p8iudnVw==RE4npFKEtkl6LliG',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.message);
        }
        console.log(data);
        console.log(data[0].name);
        for(let i = 0; i<3;i++){
            console.log(data[i].name);
        }
    })
    .catch(error => console.error('Error:', error));
};


//click button to open modal
$('#confirmBtn').on('click', function(){
    openModal();
});

//button to move onto the next exercise
//currently set to close modal
$('#nextBtn').on('click', function(){

    progressUp();
});

//button to skip to the next exercise without counting as 'completed'
//currently set to close modal
$('#skipBtn').on('click', function(){
    closeModal();
});

//button to close out of the modal
//set to close modal
$('#closeBtn').on('click', function(){
    closeModal();
});