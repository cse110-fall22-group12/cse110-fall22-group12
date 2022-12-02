import {
  is_launched_for_the_first_time,
  create_new_data,
  select_data_by_id, 
  NEW_DATA_INDEX,
  read_data_array,
  DEV_MODE
} from './data.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialization function that adds recipe cards from local storage to the html
 * document. This function also has the ability to initialize our recipes to a
 * specific set if we are doing development and/or manual testing.
 */
function init() {
  add_sample_data(DEV_MODE);

  const list = document.getElementsByClassName('recipe-list')[0];
  const data_array = read_data_array('', false);

  for (let i = 0; i < data_array.length; i += 1) {
    const data = data_array[i];
    append_recipe_as_child(list, data);
  }

  const button = document.querySelector('#button-container > img');
  button.addEventListener('click', function(event) {
    select_data_by_id(NEW_DATA_INDEX);
    window.location.href = 'edit.html';
  });
}

/**
 * This method adds the recipe data passed in as sa child to the parent. This
 * way it can be represented on the DOM.
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
  const recipe_cell = document.createElement('recipe-cell');
  recipe_cell.recipe_data = recipe_data;
  parent.appendChild(recipe_cell);
}

/**
 * This function adds multiple pieces of sample data to our local storage for
 * development and testing
 * @param {boolean} is_dev_mode specifies if we are in development mode
 */
function add_sample_data(is_dev_mode) {
  if (is_launched_for_the_first_time() && is_dev_mode) {
    create_new_data(
        'mushroom killer',
        'some ingredients',
        'some preparation',
        'some notes',
    );
    create_new_data(
        'mushroom terminator',
        'some ingredients',
        'some preparation',
        'some notes',
    );
    create_new_data(
        'mushroom slayer',
        'some ingredients',
        'some preparation',
        'some notes',
    );
  }
}

/**
 * Export declarations so that we can unit tests these functions, and use the 
 * necessary variables. 
 * NOTE: scripts should be imported as module types because of this
 */
 export {
  add_sample_data, append_recipe_as_child, init
};