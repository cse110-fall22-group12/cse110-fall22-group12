/* global

    get_selected_data,

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
  document.getElementsByClassName('dish-name')[0]
      .querySelector('h1').innerHTML = data.name;
  document.getElementsByClassName('block')[0]
      .querySelector('p').innerHTML = data.ingredients;
  document.getElementsByClassName('block')[1]
      .querySelector('p').innerHTML = data.steps;
  document.getElementsByClassName('block')[2]
      .querySelector('p').innerHTML = data.notes;
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
        delete_selected_data();
        window.location.href = 'home.html';
      });
  // when delete pop-up box's no button is clicked, stay at the edit page
  document.getElementById('no-delete-button').addEventListener('click',
      function(event) {
        const deleteElement = document.getElementById('delete-button-box');
        deleteElement.style.display = 'none';
      });
}


