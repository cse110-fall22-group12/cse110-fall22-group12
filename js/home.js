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
  if (is_launched_for_the_first_time() && DEV) {
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

  const list = document.getElementsByClassName('recipe-list')[0];

  const data_array = read_data_array('', false);
  for (let i = 0; i < data_array.length; i += 1) {
    const data = data_array[i];

    // add our local storage keys as 'recipe cells' to the home page
    const recipeCell = document.createElement('recipe-cell');
    recipeCell.recipeData = data;
    list.appendChild(recipeCell);
  }

  const button = document.getElementById('button-container');
  button.addEventListener('click', function(event) {
    select_data_by_id(new_data_index);
    window.location.href = 'edit.html';
  });
}
