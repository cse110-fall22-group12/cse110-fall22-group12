import {get_selected_data, delete_selected_data} from './data.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * This function constructs the body by reading in information about the
 * recipe from local storage.
 */
function construct_body() {

  // get the selected food recipe
  const data = get_selected_data();

  // display the name of the selected food recipe
  const name = document.getElementsByClassName('recipe-name')[0];
  name.querySelector('h1').innerHTML = data.name;

  // display the name of the selected food ingredients
  const ingredient = document.getElementsByClassName('block')[0];
  ingredient.querySelector('p').innerHTML = data.ingredients;

  // display the name of the selected recipe's steps
  const step = document.getElementsByClassName('block')[1];
  step.querySelector('p').innerHTML = data.steps;

  // display the name of the selected recipe's notes
  const note = document.getElementsByClassName('block')[2];
  note.querySelector('p').innerHTML = data.notes;
}

/**
 * Initialization function that sets up functionalities for the home, edit, 
 * and delete button. This function also displays the selected recipe.
 */
function init() {

  // display the selected recipe
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

  // when the delete button is clicked, the warning box pops out
  const view = document.getElementById('view-page-delete-button');
  view.addEventListener('click', function(event) {
    if (showing_alert_box) {
      return;
    }
    const deleteElement = document.getElementById('view-delete-box');
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
    const deleteElement = document.getElementById('view-delete-box');
    deleteElement.style.display = 'none';
    showing_alert_box = false;
  });
}
