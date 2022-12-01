/* global
    is_launched_for_the_first_time,
    select_data_by_id,
    create_new_data,
    new_data_index,
    read_data_array
*/
window.addEventListener('DOMContentLoaded', init);

/* Turn this off for deployment, but keep on for testing */
const DEV = true;

/**
 * Initialization function that adds recipe cards from local storage to the html
 * document. This function also has the ability to initialize our recipes to a
 * specific set if we are doing development and/or manual testing.
 */
function init() {
  
  add_sample_data(DEV);

  const list = document.getElementsByClassName('recipe-list')[0];

  const data_array = read_data_array('', false);

  for (let i = 0; i < data_array.length; i += 1) {
    const data = data_array[i];
    append_recipe_as_child(list, data);
  }

  const button = document.querySelector('#button-container > img');
  button.addEventListener('click', function(event) {
    select_data_by_id(new_data_index);
    window.location.href = 'edit.html';
  });
}

/**
 * This method adds the recipe data passed in as sa child to the parent. This
 * way it can be represented on the DOM.
 * 
 * @param {HTMLElement} parent the parent that we want to append our recipe to
 * @param {object} recipe_data the data that the recipe cell should be populated 
 * with. each recipe_data object should look like:
 * {
 *    id: 0, 
 *    ingredients: "some ingredients",
 *    name: "mushroom killer",
 *    notes: "some notes",
 *    steps: "some preparation"
 * }
 */
function append_recipe_as_child(parent, recipe_data) {
  const recipeCell = document.createElement('recipe-cell');
  recipeCell.recipeData = recipe_data;
  parent.appendChild(recipeCell);
}

/**
 * This function adds multiple pieces of sample data to our local storage for
 * development and testing
 * 
 * @param {boolean} is_dev specifies whether or not we are in development mode  
 */
function add_sample_data(is_dev) {
  if (is_launched_for_the_first_time() && is_dev) {
    create_new_data(
        'mushroom killer',
        ['tag', 'another tag', 'the last tag'],
        true,
        'some ingredients',
        'some preparation',
        'some notes',
    );
    create_new_data(
        'mushroom terminator',
        ['tag'],
        true,
        'some ingredients',
        'some preparation',
        'some notes',
    );
    create_new_data(
        'mushroom slayer',
        ['another tag', 'the last tag'],
        false,
        'some ingredients',
        'some preparation',
        'some notes',
    );
  }
}
