"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $postTab = $("#post-tab");
const $postFormPage = $("#post-form-container");
const $postButton = $("#post-button");

const $storyTab = $("#story-tab");
const $favTab = $("#fav-tab");
const $allFavourites = $("#all-favourites-list")

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $postFormPage,
    $allFavourites
  ];
  // components.forEach(c => c.hide());
  components.forEach(c => {
    if(!c.is(":hidden")){
      c.slideUp()
    }
  });

}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  hidePageComponents();

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  putFavouritesOnPage();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
