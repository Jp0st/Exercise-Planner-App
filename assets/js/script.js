let progress = 0;
const muscleApiKey = "VyCsYgHOiN0vL3p8iudnVw==RE4npFKEtkl6LliG";
const youtubeAPIKey = "AIzaSyB7CXfci_eYgsbIQgu5gBp2JtHvXKX8JY0";
const youtubeSearchURL = "https://www.googleapis.com/youtube/v3/search";
const submitButton = document.getElementById("formSubmit");
var exerciseList = [];

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
    if (progress === 0) {
        $(".progress").attr("value", "33");
        progress += 33;
        console.log(progress);
    } else if (progress === 33) {
        $(".progress").attr("value", "66");
        $(".progress").removeClass("is-danger");
        $(".progress").addClass("is-warning");

        progress += 33;
        console.log(progress);
    } else if (progress === 66) {
        $(".progress").attr("value", "100");
        $(".progress").removeClass("is-warning");
        $(".progress").addClass("is-success");
        progress += 34;
        console.log(progress);
    } else {
        $(".progress").addClass("is-hidden");
        $("#progress-title").text("Workout Complete!");
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
});

$("#nextBtn").on("click", () => {
    progressUp();
});

$("#skipBtn").on("click", () => {
    closeModal();
});

$("#closeBtn").on("click", () => {
    closeModal();
});


