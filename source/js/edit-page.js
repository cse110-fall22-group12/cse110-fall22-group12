/**
 * construct the edit page based on whether the user
 * is creating a new recipe or editing a current one.
 *
 */
function construct_edit_page() {
  console.log('constructing the edit page...');
}

window.onload = construct_edit_page;

/**
 * return to the previous page.
 *
 */
function edit_page_back_event_handler() {
  console.log('returning to the previous page...');
}

/**
 * save the current data by creating a new element
 * or overwrite the existing one.
 *
 */
function edit_page_save_event_handler() {
  console.log('saving the following data');
  console.log(document.getElementById('edit-page-input-name').value);
  console.log(document.getElementById('edit-page-input-ingredients').value);
  console.log(document.getElementById('edit-page-input-steps').value);
  console.log(document.getElementById('edit-page-input-notes').value);
}
