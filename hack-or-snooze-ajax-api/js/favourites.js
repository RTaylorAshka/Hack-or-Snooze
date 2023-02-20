"use strict";

$favTab.on("click", favClick);

function favClick(evt) {
  $allStoriesList.empty();
  putFavouritesOnPage();

  console.log(evt);
  hidePageComponents();

  $favTab.removeClass("dimmed");
  $postTab.addClass("dimmed");
  $storyTab.addClass("dimmed");

  $allFavourites.slideDown();
}

$allStoriesList.on("click", handlePostOptions);
$allFavourites.on("click", handlePostOptions);

async function handlePostOptions(evt) {
  const target = evt.target;
  await checkForRememberedUser();

  if (target.classList.contains("post-options")) {
    const storyId = target.parentElement.id;
    const $story = $("#" + storyId);
    console.log($story.children(".post-icons"));
    $story.children(".post-icons").slideToggle("fast");
  } else if (target.classList.contains("fav")) {
    const storyId = target.parentElement.parentElement.id;
    favStory(storyId);
    $(".post-icons").fadeOut("fast");
  } else if (target.classList.contains("unfav")) {
    const storyId = target.parentElement.parentElement.id;
    unFavStory(storyId);
    removeStoryLi(storyId);
  } else if (target.classList.contains("delete")) {
    const storyId = target.parentElement.parentElement.id;
    deleteStory(storyId);
    removeStoryLi(storyId);
  }
}

async function favStory(id) {
  if (!currentUser) {
    alert("please log in to save a favourite!");
    return;
  }

  const token = localStorage.getItem("token");
  const res = await axios.post(
    `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${id}`,
    {
      token,
    }
  );
  console.log(res);
  alert("favourite added!");
}

async function unFavStory(id) {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(currentUser.username);
  // const res = await axios.delete(`https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${id}`, {
  //         token,
  //     })
  // console.log(res);

  await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${id}`,
    method: "DELETE",
    data: { token },
  });

  alert("story unfavourited");
}

function putFavouritesOnPage() {
  $allFavourites.empty();

  if (!currentUser) {
    $allFavourites.append("<h1>Nothing here...</h1>");
    return;
  }

  const favoriteStories = getFavouritesList();

  for (let story of favoriteStories) {
    const $story = generateStoryMarkup(story);
    $allFavourites.append($story);
  }
}

function getFavouritesList() {
  if (!currentUser) {
    alert("please log in to see favourites!");
    return;
  }
  const faveStoryList = currentUser.favorites;
  faveStoryList.map((s) => new Story(s));
  return faveStoryList;
}
