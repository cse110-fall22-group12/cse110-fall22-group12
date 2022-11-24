/**
 * set up all the functilnalities for home button, edit button and
 * delete button.
 */
function construct_view_page() {
  // const data = get_selected_data();
  // document.getElementById('recipe-name').innerHTML = data.name;
  // document.getElementById('recipe-ingredients').innerHTML = data.ingredients;
  // document.getElementById('recipe-preparation').innerHTML = data.steps;
  // document.getElementById('recipe-notes').innerHTML = data.notes;

  // when home button is clicked,  transit to home page
  document.getElementById('view-page-home-button').addEventListener('click',
      function(event) {
        window.location.href = 'home.html';
      });
  // when edit button is clicked, transit to edit page
  document.getElementById('view-page-edit-button').addEventListener('click',
      function(event) {
        window.location.href = 'edit.html';
      });
  // when delete button is clicked, the warning box pop out
  document.getElementById('view-page-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('delete-button-box');
        deleteElement.style.display = 'block';
      });
  // when delete pop-up box's yes button is clicked, transit to home page
  document.getElementById('yes-delete-button').addEventListener('click',
      function(event) {
        // delete_selected_data();
        window.location.href = 'home.html';
      });
  // when delete pop-up box's no button is clicked, stay at the edit page
  document.getElementById('no-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('delete-button-box');
        deleteElement.style.display = 'none';
      });
}

// display the changes on view page
window.onload = construct_view_page;
