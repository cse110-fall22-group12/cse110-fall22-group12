/* global

    get_selected_data,
    delete_selected_data,

*/
/**
 * set up all the functilnalities for home button, edit button and
 * delete button.
 */

window.addEventListener('DOMContentLoaded', init);
/**
 * set up all the functilnalities for home button, edit button and
 * delete button.
 */
function construct_body() {
  //get the selected food recipe 
  const data = get_selected_data();

  //display the name of the selected food recipe
  const name = document.getElementsByClassName('recipe-name')[0];
  name.querySelector('h1').innerHTML = data.name;

  //display the name of the selected food ingredients
  const ingredient = document.getElementsByClassName('block')[0];
  ingredient.querySelector('p').innerHTML = data.ingredients;

  //display the name of the selected recipe's steps
  const step = document.getElementsByClassName('block')[1];
  step.querySelector('p').innerHTML = data.steps;

  //display the name of the selected recipe's notes
  const note = document.getElementsByClassName('block')[2];
  note.querySelector('p').innerHTML = data.notes;
}

/**
 * set up all the functilnalities for home button, edit button and
 * delete button.
 */
function init() {
  //set up functilnalities for home button, edit button and delete button
  construct_body();
  let showing_alert_box = false;
  // when home button is clicked,  transit to home page
  const home = document.getElementById('view-page-home-button');
  home.addEventListener('click', function(event) {
    if (showing_alert_box) {
      return;
    }
    window.location.href = 'home.html';
  });
  // when edit button is clicked, transit to edit page
  const edit = document.getElementById('view-page-edit-button');
  edit.addEventListener('click', function(event) {
    if (showing_alert_box) {
      return;
    }
    window.location.href = 'edit.html';
  });

  // when delete button is clicked, the warning box pop out
  const view = document.getElementById('view-page-delete-button');
  view.addEventListener('click', function(event) {
    if (showing_alert_box) {
      return;
    }
    const deleteElement = document.getElementById('view-delete-button-box');
    deleteElement.style.display = 'block';
    showing_alert_box = true;
  });

  // when delete pop-up box's yes button is clicked, transit to home page
  const yes_button = document.getElementById('view-yes-delete-button');
  yes_button.addEventListener('click', function(event) {
    delete_selected_data();
    window.location.href = 'home.html';
    showing_alert_box = false;
  });

  // when delete pop-up box's no button is clicked, stay at the edit page
  const no_button = document.getElementById('view-no-delete-button');
  no_button.addEventListener('click', function(event) {
    const deleteElement = document.getElementById('view-delete-button-box');
    deleteElement.style.display = 'none';
    showing_alert_box = false;
  });
}
