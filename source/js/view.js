/* global
    get_selected_data,
    delete_selected_data
*/

function construct_view_page() {
  const data = get_selected_data();
  document.getElementById('recipe-name').innerHTML = data.name;
  document.getElementById('recipe-ingredients').innerHTML = data.ingredients;
  document.getElementById('recipe-preparation').innerHTML = data.steps;
  document.getElementById('recipe-notes').innerHTML = data.notes;

  document.getElementById('view-page-home-button').addEventListener('click',
      function(event) {
        window.location.href = 'home.html';
      });

  document.getElementById('view-page-edit-button').addEventListener('click',
      function(event) {
        window.location.href = 'edit.html';
      });

  document.getElementById('view-page-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('delete-button-box');
        deleteElement.style.display = 'block';
      });

  document.getElementById('yes-delete-button').addEventListener('click',
      function(event) {
        delete_selected_data();
        window.location.href = 'home.html';
      });

  document.getElementById('no-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('delete-button-box');
        deleteElement.style.display = 'none';
      });
}

window.onload = construct_view_page;
