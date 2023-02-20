function addDeleteButton(story) {
  if (currentUser && currentUser.username === story.username) {
    return '<button class="delete">delete</button>';
  }
  return undefined;
}

function isStoryFavorited(story) {
  if (
    currentUser &&
    currentUser.favorites.find(
      (userStory) => userStory.storyId === story.storyId
    )
  ) {
    return true;
  }
  return false;
}

function generateClickableActions(story) {
  if (!currentUser) {
    return "";
  }
  const favoriteOrUnfavorite = isStoryFavorited(story)
    ? '<button class = "unfav">unfavourite</button>'
    : '<button class = "fav">favourite</button>';
  console.log(favoriteOrUnfavorite, isStoryFavorited(story));

  const deleteButton = addDeleteButton(story);

  return `
            <div class = "post-icons hidden">
              ${favoriteOrUnfavorite}
              <br/>
              ${deleteButton ? deleteButton : ""}
            </div>
            `;
}

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  return $(`
    
          <li id="${story.storyId}">
          
            ${generateClickableActions(story)}
    
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
