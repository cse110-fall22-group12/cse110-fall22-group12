/**
 * construct the edit page based on whether the user
 * is creating a new recipe or editing a current one.
 *
 */
window.onload = function() {
  // initialize thepage here:
  console.log('constructing the edit page...');
  // return:
  const back = document.getElementById('edit-page-back-button');
  back.addEventListener('click', function() {
    console.log('returning to the previous page...');
  });
  // save:
  const save = document.getElementById('edit-page-save-button');
  save.addEventListener('click', function() {
    console.log('saving the following data');
    console.log(document.getElementById('edit-page-input-name').value);
    console.log(document.getElementById('edit-page-input-ingredients').value);
    console.log(document.getElementById('edit-page-input-steps').value);
    console.log(document.getElementById('edit-page-input-notes').value);
  });
};
