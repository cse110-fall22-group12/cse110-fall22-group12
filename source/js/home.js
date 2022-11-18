import sample_data from '../assets/sample-data.js';
window.addEventListener('DOMContentLoaded', init);

/* Turn this off for deployment, but keep on for testing */
const DEV = true;

/**
 * Initialization function that adds recipe cards from local storage to the html document
 * This function also has the ability to initialize our recipes to a specific set if we
 * are doing development and/or manual testing
 *  */
function init() {
  if (DEV) add_sample_data_to_local_storage();

  const list = document.getElementsByClassName('recipe-list')[0];

  for (const key in localStorage) {
    // skip the keys that exist in local storage by default
    if (key == 'next_id' || key == 'key' || key == 'getItem' || key == 'setItem' ||
            key == 'removeItem' || key == 'clear' || key == 'length') {
      continue;
    }

    // add our local storage keys as 'recipe cells' to the home page
    const recipe_card1 = document.createElement('recipe-cell');
    recipe_card1.recipe_name = JSON.parse(localStorage.getItem(key))['name'];
    list.appendChild(recipe_card1);
  }
}

/**
 * Initializes or edits the first 5 key value pairs of localstorage [0:4] as certain predefined
 * Objects. This helps us develop withjout having to paste data into the localstorage
 *  */
function add_sample_data_to_local_storage() {
  // localStorage.clear();
  for (const key of Object.keys(sample_data)) {
    const str = JSON.stringify(sample_data[key]);
    localStorage.setItem(key, str);
  }
}
