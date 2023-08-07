//shows the modal window
function openModal(){
    $('#active-modal').addClass('is-active');
};

// hides the modal window
function closeModal(){
    $('#active-modal').removeClass('is-active');
};

//click button to open modal
$('#btn').on('click', function(){
    openModal();
});

//button to move onto the next exercise
//currently set to close modal
$('#nextBtn').on('click', function(){
    closeModal();
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