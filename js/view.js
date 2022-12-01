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
  const data = get_selected_data();
  const name = document.getElementsByClassName('recipe-name')[0];
  name.querySelector('h1').innerHTML = data.name;
  const ingredient = document.getElementsByClassName('block')[0];
  ingredient.querySelector('p').innerHTML = data.ingredients;
  const step = document.getElementsByClassName('block')[1];
  step.querySelector('p').innerHTML = data.steps;
  const note = document.getElementsByClassName('block')[2];
  note.querySelector('p').innerHTML = data.notes;
}
/**
 * set up all the functilnalities for home button, edit button and
 * delete button.
 */
function init() {
  construct_body();
  // when home button is clicked,  transit to home page
  const home = document.getElementById('view-page-home-button');
  home.addEventListener('click',
      function(event) {
        window.location.href = 'home.html';
      });
  // when edit button is clicked, transit to edit page
  const edit = document.getElementById('view-page-edit-button');
  edit.addEventListener('click',
      function(event) {
        window.location.href = 'edit.html';
      });
  // when delete button is clicked, the warning box pop out
  const view = document.getElementById('view-page-delete-button');
  view.addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('view-delete-button-box');
        deleteElement.style.display = 'block';
      });
  // when delete pop-up box's yes button is clicked, transit to home page
  document.getElementById('view-yes-delete-button').addEventListener('click',
      function(event) {
        delete_selected_data();
        window.location.href = 'home.html';
      });
  // when delete pop-up box's no button is clicked, stay at the edit page
  document.getElementById('view-no-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('view-delete-button-box');
        deleteElement.style.display = 'none';
      });
}


