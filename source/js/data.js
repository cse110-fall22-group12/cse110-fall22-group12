/* eslint-disable
    camelcase,
    no-unused-vars,
*/

/**
 * This global integer variable is something you should select
 * when you create a new data from the homepage.
 * @global
 */
const new_data_index = -1;

/**
 * This global string variable defines the name of the key
 * of the array of all the data the program stores.
 * @global
 */
const data_array_key = 'noshroom_data_array';

/**
 * This global string variable defines the name of the key
 * of an integer that is incremented by 1 to generate the
 * unique id for a new data when creating it.
 * @global
 */
const id_generator_key = 'noshroom_id_generator';

/**
 * This global string variable defines the name of the key
 * of the id of the selected data we are viewing, editing,
 * or deleting.
 * @global
 */
const selected_data_id_key = 'selected_data_id';

/**
 * This global data object is the template the program use
 * to create a new data object through copying it.
 * @global
 */
const template_data = {
  id: -1,
  name: '',
  tags: [],
  favorited: false,
  ingredients: '',
  steps: '',
  notes: '',
};

/**
 * This function is a wrapper for the getItem function of the localStorage.
 * @global
 * @param {string}    key   The key of the item.
 * @return {any} The data returned by calling the getItem function.
 */
function get_data(key) {
  return window.localStorage.getItem(key);
}

/**
 * This function is a wrapper for the setItem function of the localStorage.
 * @global
 * @param {string}    key     The key of the item.
 * @param {any}       data    The item to save.
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
  if (get_data(data_array_key) === null) {
    set_data(data_array_key, JSON.stringify([]));
    return true;
  }
  return false;
}

/**
 * This function creates a new data object and write to the local storage.
 * After calling this function, the new data will automatically be selected.
 * @global
 * @param {string}      name            The name of the new data object.
 * @param {array}       tags            The array of tags of the data object.
 * @param {boolean}     favorited       The boolean indicating favorited.
 * @param {string}      ingredients     The ingredients of the new data object.
 * @param {string}      steps           The steps of the new data object.
 * @param {string}      notes           The notes of the new data object.
 */
function create_new_data(name, tags, favorited, ingredients, steps, notes) {
  const new_data = JSON.parse(JSON.stringify(template_data));
  if (get_data(id_generator_key) === null) {
    set_data(id_generator_key, 1);
    new_data.id = 0;
  } else {
    new_data.id = parseInt(get_data(id_generator_key));
    set_data(id_generator_key, new_data.id + 1);
  }
  new_data.name = name;
  new_data.tags = tags;
  new_data.favorited = favorited;
  new_data.ingredients = ingredients;
  new_data.steps = steps;
  new_data.notes = notes;
  if (get_data(data_array_key) === null) {
    set_data(data_array_key, JSON.stringify([new_data]));
  } else {
    const data_array = JSON.parse(get_data(data_array_key));
    data_array.push(new_data);
    set_data(data_array_key, JSON.stringify(data_array));
  }
  select_data_by_id(new_data.id);
}

/**
 * This function reads the array of data from the local storage.
 * You can provide the following parameters to narrow the results.
 * @global
 * @param {string}      search_keywords       Very straightforward.
 * @param {boolean}     show_favorited_only   Very straightforward.
 * @return {array} The array of data stored in local storage.
 */
function read_data_array(search_keywords, show_favorited_only) {
  if (get_data(data_array_key) === null) {
    return [];
  }
  const raw_data_array = JSON.parse(get_data(data_array_key));
  const search_array = search_keywords.trim().split('#');
  for (let i = 0; i < search_array.length; i += 1) {
    search_array[i] = search_array[i].trim();
  }
  const data_array = [];
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (search_array.length > 0) {
      if (search_array[0]) {
        if (!data.name.toLowerCase().includes(search_array[0].toLowerCase())) {
          continue;
        }
      }
      let all_tags_found = true;
      for (let search_index = 1; search_index < search_array.length; search_index += 1) {
        let current_tag_found = false;
        if (search_array[search_index]) {
          for (const tag_index in data.tags) {
            if (data.tags[tag_index] == search_array[search_index]) {
              current_tag_found = true;
              break;
            }
          }
        }
        if (!current_tag_found) {
          all_tags_found = false;
          break;
        }
      }
      if (!all_tags_found) {
        continue;
      }
    }
    if (show_favorited_only && !data.favorited) {
      continue;
    }
    data_array.push(data);
  }
  return data_array;
}

/**
 * This function selects a data by its id so that we can perform
 * operations to read, edit, and delete it. Selecting another
 * data overwrites the previous one.
 * @global
 * @param {number}      id      The id of the data object to select.
 */
function select_data_by_id(id) {
  set_data(selected_data_id_key, parseInt(id));
}

/**
 * This function returns the id of the selected data selected
 * after calling the function select_data_by_id.
 * If nothing has been selected, this function returns -1.
 * @global
 * @return {number} The id of the selected data or -1 if it does not exist.
 */
function get_selected_data_id() {
  if (get_data(selected_data_id_key) === null) {
    return -1;
  }
  return get_data(selected_data_id_key);
}

/**
 * This function returns the selected data object.
 * @global
 * @return {data} The selected data object.
 */
function get_selected_data() {
  if (get_data(data_array_key) === null) {
    return JSON.parse(JSON.stringify(template_data));
  }
  const raw_data_array = JSON.parse(get_data(data_array_key));
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (data.id == get_selected_data_id()) {
      return data;
    }
  }
  return JSON.parse(JSON.stringify(template_data));
}

/**
 * This function overwrites the selected data object with a new one.
 * @global
 * @param {data}     new_data        The new data.
 */
function overwrite_selected_data(new_data) {
  if (get_data(data_array_key) === null) {
    return;
  }
  const raw_data_array = JSON.parse(get_data(data_array_key));
  const data_array = [];
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (data.id == get_selected_data_id()) {
      data_array.push(new_data);
    } else {
      data_array.push(data);
    }
  }
  set_data(data_array_key, JSON.stringify(data_array));
}

/**
 * This function deletes the selected data object.
 * @global
 */
function delete_selected_data() {
  if (get_data(data_array_key) === null) {
    return;
  }
  const raw_data_array = JSON.parse(get_data(data_array_key));
  const data_array = [];
  for (let i = 0; i < raw_data_array.length; i += 1) {
    const data = raw_data_array[i];
    if (data.id != get_selected_data_id()) {
      data_array.push(data);
    }
  }
  set_data(data_array_key, JSON.stringify(data_array));
}
