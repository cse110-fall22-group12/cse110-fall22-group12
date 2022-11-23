window.addEventListener('DOMContentLoaded', init);

/**
 * Starts the program and initialize the edit page.
 * 
 * @global
 */
function init() {
  const edit = get_selected_data_id() != new_data_index;
  construct_header(edit);
  construct_body(edit);
}

/**
 * Constructs the edit page.
 * 
 * @global
 * 
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
 * 
 * @global
 * 
 * @param {boolean}   edit  Whether the user is editing or adding a new recipe.
 */
function construct_header(edit) {
  // initialize the back button:
  const back = document.getElementById('edit-back');
  back.addEventListener('click', function () {
    // jump back to the correct page:
    if (get_selected_data_id() != new_data_index) {
      window.location.href = 'view.html';
    }else{
      window.location.href = 'home.html';
    }
  });
  // initialize the save button:
  const save = document.getElementById('edit-save');
  save.addEventListener('click', function () {
    // TODO: check if name is blank, if so alert user and don't save
    // create overwrite or create new:
    if (get_selected_data_id() != new_data_index) {
      const data = get_selected_data();
      data.name = document.getElementById('edit-name').value.trim();
      data.ingredients = document.getElementById('edit-ingredients').value;
      data.steps = document.getElementById('edit-steps').value;
      data.notes = document.getElementById('edit-notes').value;
      overwrite_selected_data(data);
      window.location.href = 'view.html';
    }else{
      create_new_data(
        document.getElementById('edit-name').value.trim(), [], false,
        document.getElementById('edit-ingredients').value,
        document.getElementById('edit-steps').value,
        document.getElementById('edit-notes').value
      );
      window.location.href = 'home.html';
    }
  });
}
