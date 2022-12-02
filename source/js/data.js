/* eslint-disable
    no-unused-vars,
*/

/**
 * This is a global boolean variable signifying dev mode
 * Turn this off for deployment, but keep on for testing & development
 * */
const DEV_MODE = true;

/**
 * This global integer variable is something you should select
 * when you create a new data from the homepage.
 * @global
 */
const NEW_DATA_INDEX = -1;

/**
 * This global string variable defines the name of the key
 * of the array of all the data the program stores.
 * @global
 */
const DATA_ARRAY_KEY = 'noshroom_data_array';

/**
 * This global string variable defines the name of the key
 * of an integer that is incremented by 1 to generate the
 * unique id for a new data when creating it.
 * @global
 */
const ID_GENERATOR_KEY = 'noshroom_id_generator';

/**
 * This global string variable defines the name of the key
 * of the id of the selected data we are viewing, editing,
 * or deleting.
 * @global
 */
const SELECTED_DATA_ID_KEY = 'selected_data_id';

/**
 * This global data object is the template the program use
 * to create a new data object through copying it.
 * @global
 */
const template_data = {
  id: -1,
  name: '',
  ingredients: '',
  steps: '',
  notes: '',
};

/**
 * This function is a wrapper for the getItem function of the localStorage.
 * @global
 * @param {string} key The key of the item.
 * @return {any} The data returned by calling the getItem function.
 */
function get_data(key) {
  return window.localStorage.getItem(key);
}

/**
 * This function is a wrapper for the setItem function of the localStorage.
 * @global
 * @param {string} key The key of the item.
 * @param {any} data The item to save.
 */
function set_data(key, data) {
  window.localStorage.setItem(key, data);
}

/**
 * This function checks whether the program is launched for the first time.
 * Calling this function marks that the program has been launched previously.
 * @global
 * @return {boolean} First launch indicator.
 */
function is_launched_for_the_first_time() {
  if (get_data(DATA_ARRAY_KEY) === null) {
    set_data(DATA_ARRAY_KEY, JSON.stringify([]));
    return true;
  }
  return false;
}

/**
 * This function creates a new data object and write to the local storage.
 * After calling this function, the new data will automatically be selected.
 * @global
 * @param {string} name The name of the new data object.
 * @param {string} ingredients The ingredients of the new data object.
 * @param {string} steps The steps of the new data object.
 * @param {string} notes The notes of the new data object.
 * @return {object} the created recipe data object in the form:
 * {
 *    id: 0,
 *    ingredients: "some ingredients",
 *    name: "mushroom killer",
 *    notes: "some notes",
 *    steps: "some preparation"
 * }
 */
function create_new_data(name, ingredients, steps, notes) {
  console.log("BIG CHECK");
  const new_data = JSON.parse(JSON.stringify(template_data));
  if (get_data(ID_GENERATOR_KEY) === null) {
    set_data(ID_GENERATOR_KEY, 1);
    new_data.id = 0;
  } else {
    new_data.id = parseInt(get_data(ID_GENERATOR_KEY));
    set_data(ID_GENERATOR_KEY, new_data.id + 1);
  }
  new_data.name = name;
  new_data.ingredients = ingredients;
  new_data.steps = steps;
  new_data.notes = notes;
  // add the new recipe to the total recipe string in local storage
  if (get_data(DATA_ARRAY_KEY) === null) {
    set_data(DATA_ARRAY_KEY, JSON.stringify([new_data]));
  } else {
    const data_array = JSON.parse(get_data(DATA_ARRAY_KEY));
    data_array.push(new_data);
    set_data(DATA_ARRAY_KEY, JSON.stringify(data_array));
  }
  // 'select' the most recent added data so that we can view it in another page
  select_data_by_id(new_data.id);
  return new_data;
}

/**
 * This function reads the array of data from the local storage.
 * @global
 * @return {array} The array of data stored in local storage, where
 * each element is a recipe object that looks like:
 * {
 *    id: 0,
 *    ingredients: "some ingredients",
 *    name: "mushroom killer",
 *    notes: "some notes",
 *    steps: "some preparation"
 * }
 */
function read_data_array() {
  if (get_data(DATA_ARRAY_KEY) === null) {
    return [];
  }
  // read the full recipe data string and parse it into json
  const data_array = JSON.parse(get_data(DATA_ARRAY_KEY));
  // we can add in the tag/search term refining loop here in a future iteration
  return data_array;
}

/**
 * Stores a notion of "selected recipe". This is so that in the future we can
 * get our selected recipe and perform view, edit, delete operations on it.
 * Selecting another data overwrites the previous one.
 * @global
 * @param {number} id The id of the data object to select.
 */
function select_data_by_id(id) {
  set_data(SELECTED_DATA_ID_KEY, parseInt(id));
}

/**
 * This function returns the id of the selected data selected
 * after calling the function select_data_by_id.
 * If nothing has been selected, this function returns -1.
 * @global
 * @return {number} The id of the selected data or -1 if it does not exist.
 */
function get_selected_data_id() {
  if (get_data(SELECTED_DATA_ID_KEY) === null) {
    return -1;
  }
  return Number(get_data(SELECTED_DATA_ID_KEY));
}

/**
 * This function returns the selected data object.
 * @global
 * @return {data} The selected data object.
 */
function get_selected_data() {
  if (get_data(DATA_ARRAY_KEY) === null) {
    return JSON.parse(JSON.stringify(template_data));
  }
  const raw_data_array = JSON.parse(get_data(DATA_ARRAY_KEY));
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (data.id == get_selected_data_id()) {
      return data;
    }
  }
  // if not found return the empty data
  return JSON.parse(JSON.stringify(template_data));
}

/**
 * This function overwrites the selected data object with a new one.
 * @global
 * @param {data} new_data The new data that will overwrite the
 * currently selected recipe. this data object should look like
 * {
 *    id: 0,
 *    ingredients: "some ingredients",
 *    name: "mushroom killer",
 *    notes: "some notes",
 *    steps: "some preparation"
 * }
 */
function overwrite_selected_data(new_data) {
  if (get_data(DATA_ARRAY_KEY) === null) {
    return;
  }
  const raw_data_array = JSON.parse(get_data(DATA_ARRAY_KEY));
  const data_array = [];
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    // replace only the data element that has a matching id with the new recipe
    if (data.id == get_selected_data_id()) {
      data_array.push(new_data);
    } else {
      data_array.push(data);
    }
  }
  set_data(DATA_ARRAY_KEY, JSON.stringify(data_array));
}

/**
 * This function deletes the selected data object.
 * @global
 */
function delete_selected_data() {
  if (get_data(DATA_ARRAY_KEY) === null) {
    return;
  }
  const raw_data_array = JSON.parse(get_data(DATA_ARRAY_KEY));
  const data_array = [];
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (data.id != get_selected_data_id()) {
      data_array.push(data);
    }
  }
  set_data(DATA_ARRAY_KEY, JSON.stringify(data_array));
}

/**
 * Export declarations so that we can unit tests these functions, and use the
 * necessary variables
 * NOTE: scripts should be imported as module types because of this
 */
export {
  get_data, set_data, is_launched_for_the_first_time,
  create_new_data, read_data_array, select_data_by_id, get_selected_data_id,
  get_selected_data, overwrite_selected_data, delete_selected_data,
  DATA_ARRAY_KEY, ID_GENERATOR_KEY, DEV_MODE, NEW_DATA_INDEX,
};
