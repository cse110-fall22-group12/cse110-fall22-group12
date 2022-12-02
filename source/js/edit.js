
import {
    get_selected_data_id,
    NEW_DATA_INDEX,
    get_selected_data, 
    overwrite_selected_data,
    create_new_data,
} from './data.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * Starts the program and initialize the edit page.
 * @global
 */
function init() {
  const edit = get_selected_data_id() != NEW_DATA_INDEX;
  construct_header(edit);
  construct_body(edit);
}

/**
 * Constructs the edit page.
 * @global
 * @param {boolean}   edit  Whether the user is editing or adding a new recipe.
 */
function construct_body(edit) {
  if (edit) {
    const data = get_selected_data();
    document.getElementById('edit-name').value = data.name;
    document.getElementById('edit-ingredients').value = data.ingredients;
    document.getElementById('edit-steps').value = data.steps;
    document.getElementById('edit-notes').value = data.notes;
  }
}

/**
 * Constructs the header.
 * @global
 * @param {boolean}   edit  Whether the user is editing or adding a new recipe.
 */
function construct_header(edit) {
  let showing_alert_box = false;
  const back = document.getElementById('edit-back');
  const save = document.getElementById('edit-save');
  // initialize the back button:
  back.addEventListener('click', function() {
    if (showing_alert_box) {
      return;
    }
    // jump back to the correct page:
    if (get_selected_data_id() != NEW_DATA_INDEX) {
      window.location.href = 'view.html';
    } else {
      window.location.href = 'home.html';
    }
  });
  // initialize the save button:
  save.addEventListener('click', function() {
    if (showing_alert_box) {
      return;
    }
    // check if name is blank, if so alert user and don't save
    if (document.getElementById('edit-name').value === '') {
      const editElement = document.getElementById('edit-button-box');
      editElement.style.display = 'block';
      const name = document.getElementById('edit-name');
      const ingredients = document.getElementById('edit-ingredients');
      const steps = document.getElementById('edit-steps');
      const notes = document.getElementById('edit-notes');
      name.setAttribute('disabled', 'disabled');
      ingredients.setAttribute('disabled', 'disabled');
      steps.setAttribute('disabled', 'disabled');
      notes.setAttribute('disabled', 'disabled');
      showing_alert_box = true;
    } else if (get_selected_data_id() != NEW_DATA_INDEX) {
      const data = get_selected_data();
      data.name = document.getElementById('edit-name').value.trim();
      data.ingredients = document.getElementById('edit-ingredients').value;
      data.steps = document.getElementById('edit-steps').value;
      data.notes = document.getElementById('edit-notes').value;
      overwrite_selected_data(data);
      window.location.href = 'view.html';
    } else {
      const name = document.getElementById('edit-name').value.trim();
      const ingredients = document.getElementById('edit-ingredients').value;
      const steps = document.getElementById('edit-steps').value;
      const notes = document.getElementById('edit-notes').value;
      create_new_data(name, [], false, ingredients, steps, notes);
      window.location.href = 'home.html';
    }
  });

  const ok_button = document.getElementById('ok-edit-button');
  ok_button.addEventListener('click', function(event) {
    const editElement = document.getElementById('edit-button-box');
    editElement.style.display = 'none';
    const name = document.getElementById('edit-name');
    const ingredients = document.getElementById('edit-ingredients');
    const steps = document.getElementById('edit-steps');
    const notes = document.getElementById('edit-notes');
    name.removeAttribute('disabled');
    ingredients.removeAttribute('disabled');
    steps.removeAttribute('disabled');
    notes.removeAttribute('disabled');
    showing_alert_box = false;
  });
}
