"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`

      <li id="${story.storyId}">

        <div class = "hidden post-icons">
          <button class = "fav">favourite</button>
          <br/>
          <button class = "delete">delete</button>
        </div>

        <button class = "post-options">&#10247;</button>
        
        <div class = "post-content">
          <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
          </a>
        
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
          <br/>
        </div>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  
  $allFavourites.empty();
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.slideDown();
}

$storyTab.on("click", storyTabClick);

function storyTabClick(){
  hidePageComponents();
  $favTab.addClass("dimmed");
  $postTab.addClass("dimmed");
  $storyTab.removeClass("dimmed");
  
  putStoriesOnPage();
}


async function deleteStory(id){
  if(!currentUser){
    alert("please log in to delete a story.");
    return;
  }

  const token = localStorage.getItem("token");
  // const res = await axios.delete(`https://hack-or-snooze-v3.herokuapp.com/stories/${id}`, {
  //       token,
  //   })
  // console.log(res);
  
  await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/stories/${id}`,
    method: "DELETE",
    data: { token, }
  });

  alert("story deleted!")

}


function removeStoryLi(id){
  $("#" + id).fadeOut("slow").remove();
}
