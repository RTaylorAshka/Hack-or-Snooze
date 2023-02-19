"use strict";

$postTab.on("click", postClick);

function postClick(evt){
    console.log(evt);
    hidePageComponents();
    $postFormPage.slideDown();
    $favTab.addClass("dimmed");
    $postTab.removeClass("dimmed");
    $storyTab.addClass("dimmed");


}

$postButton.on("click", postSubmit);

function postSubmit(){
    const $postVals = $("#post-form > input[type=text], input[type=url]");
    const storySubmit = 
    {   title: $postVals[0].value, 
        author: $postVals[1].value, 
        url: $postVals[2].value
    }
    console.log(storySubmit);
    storyList.addStory(currentUser,
        {   title: storySubmit.title, 
            author: storySubmit.author, 
            url: storySubmit.url
        });
    
    alert("Post submitted!");
    storyTabClick();
    
    



    
}

