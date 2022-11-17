/**
 * construct the edit page based on whether the user
 * is creating a new recipe or editing a current one.
 *
 */
window.onload = function() {

  console.log('constructing the edit page...');

  document.getElementById('edit-page-back-button').addEventListener('click', function() {
    console.log('returning to the previous page...');
  });

  document.getElementById('edit-page-save-button').addEventListener('click', function() {
    console.log('saving the following data');
    console.log(document.getElementById('edit-page-input-name').value);
    console.log(document.getElementById('edit-page-input-ingredients').value);
    console.log(document.getElementById('edit-page-input-steps').value);
    console.log(document.getElementById('edit-page-input-notes').value);
  });
  
};