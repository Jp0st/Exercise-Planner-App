let progress = 33;
const muscleApiKey = "VyCsYgHOiN0vL3p8iudnVw==RE4npFKEtkl6LliG";
const youtubeAPIKey = "AIzaSyB7CXfci_eYgsbIQgu5gBp2JtHvXKX8JY0";
const youtubeSearchURL = "https://www.googleapis.com/youtube/v3/search?";
const submitButton = document.getElementById("formSubmit");
var exerciseList = [];
var exerciseListReturned = [];
var counter = 1;

let muscleGroup, intensity, time;

const formSubmitHandler = () => {
    document.getElementById("myForm").addEventListener("submit", (event) => {
        event.preventDefault();
        muscleGroup = $("#muscle").val();
        intensity = $("#intensity").val();
        time = $("#time").val();
        console.log(muscleGroup, intensity, time);
        const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleGroup}&difficulty=${intensity}`;
        getExerciseApi(url);
        
    });
};

if (submitButton) {
    formSubmitHandler();
}

const openModal = () => {
    $("#active-modal").addClass("is-active");
};

const closeModal = () => {
    $("#active-modal").removeClass("is-active");
};

const progressUp = () => {
    if (progress === 33) {
       
        $(".progress").attr("value", progress);
        $(".progress").addClass("is-danger");
        progress += 33;
        console.log(progress);
    } else if (progress === 66) {
      
        $(".progress").attr("value", progress);
        $(".progress").removeClass("is-danger");
        $(".progress").addClass("is-warning");

        progress += 34;
        console.log(progress);
    } else if (progress === 100) {
      
        $(".progress").attr("value", progress);
        $(".progress").removeClass("is-warning");
        $(".progress").addClass("is-success");
        $('#nextBtn').text('Complete Workout')
        progress = progress += 1;
        console.log(progress);
    } else {
        $(".progress").addClass("is-hidden");
        $("#modalTitle").text("Workout Complete!");
        $('#modalDesc').text('Good Job!!!');
    }
};

const getExerciseApi = (url) => {
    fetch(url, {
        method: "GET",
        headers: {
            "X-Api-Key": "VyCsYgHOiN0vL3p8iudnVw==RE4npFKEtkl6LliG",
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
            
        })
        .then((data) => {
            if (data.error) {
                throw new Error(data.message);
                
            }

            exerciseList = [];
            console.log(data)
            for (let i = 0; i < 3; i++) {
                var savedName = (data[i].name);
                console.log(savedName);
                var savedInstructions = (data[i].instructions);
                console.log(savedInstructions);
                let exercises = {
                    name: savedName,
                    howTo: savedInstructions
                }
                exerciseList.push(exercises);
                window.localStorage.setItem('exerciseList', JSON.stringify(exerciseList));
                window.location.href = "workout_card.html";
            }
        })
        .catch((error) => console.error("Error:", error));
};

$("#confirmBtn").on("click", () => {
    openModal();
    // tempInit();
    populateModal();
    progressUp();
    fetchYoutubeApi();
});


$("#nextBtn").on("click", () => {
    progressUp();
    if (counter < exerciseListReturned.length) {
        $("#modalTitle").text( exerciseListReturned[counter].name);
        $("#modalDesc").text(exerciseListReturned[counter].howTo);
        counter++;
      }
});

$("#skipBtn").on("click", () => {
    closeModal();
});

$("#closeBtn").on("click", () => {
    closeModal();
    resetProgress()
});

function tempInit(){
  
    exerciseListReturned=  JSON.parse(window.localStorage.getItem('exerciseList'));

    console.log(exerciseListReturned);
    $('#exerciseOneName').text(exerciseListReturned[0].name);
    $('#exerciseOneDesc').text(exerciseListReturned[0].howTo);
    $('#exerciseTwoName').text(exerciseListReturned[1].name);
    $('#exerciseTwoDesc').text(exerciseListReturned[1].howTo);
    $('#exerciseThreeName').text(exerciseListReturned[2].name);
    $('#exerciseThreeDesc').text(exerciseListReturned[2].howTo);
}

$(document).ready(function(){
  tempInit()
});


function populateModal(){
    $('#modalTitle').text(exerciseListReturned[0].name);
    $('#modalDesc').text(exerciseListReturned[0].howTo);
};

function resetProgress(){
    progress = 33;
    counter = 1;
    $(".progress").attr("value", progress);
    $(".progress").removeClass("is-danger");
    $(".progress").removeClass("is-success");
    $(".progress").removeClass("is-warning");
    $(".progress").removeClass("is-hidden");
    $("#progress-title").text("Progress bar");
    $('#nextBtn').text('Next');
    populateModal(); 
}

function fetchYoutubeApi(){
    fullYoutubeSearchURL = youtubeSearchURL + '&q=' + exerciseListReturned[0].name + '&key=' + youtubeAPIKey;
    fetch(fullYoutubeSearchURL)
        .then(function (response){
            return response.json();
    })
    .then(function(data){
        console.log(data);
        $('#videoExample').attr('src', 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId);
    })
};

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'autoplay': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}