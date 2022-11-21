/**
 * construct the edit page based on whether the user
 * is creating a new recipe or editing a current one.
 *
 */
window.onload = function () {
  // initialize thepage here:
  console.log('constructing the edit page...');
  // return:
  const back = document.getElementById('edit-page-back-button');
  back.addEventListener('click', function () {
    console.log('returning to the previous page...');
  });
  // save:
  const save = document.getElementById('edit-page-save-button');
  save.addEventListener('click', function () {
    console.log('saving the following data');
    console.log(document.getElementById('edit-page-input-name').value);
    console.log(document.getElementById('edit-page-input-ingredients').value);
    console.log(document.getElementById('edit-page-input-steps').value);
    console.log(document.getElementById('edit-page-input-notes').value);
  });
};


// Lucas' suggestion
window.addEventListener('DOMDOMContentLoaded', init);
/**
 * Starts the program, all function calls trace back here
 */
function init() {
  // initiailize based on whether it's edit or add
  // decide on how this can be done, this can be done thorugh global variable,
  // or local storage, hidden html element, etc.
  // TODO
  const edit = true;
  constructHeader(edit);
  constructBody(edit);
}

/**
 * Constructs the edit page
 * @param {boolean} edit - whether the user is editing or adding a new recipe
 */
function constructBody(edit = false) {
  // construct body by populating the fields
  // set dummy values, should be replaced by user data later if it's edit
  let recipeData = {};
  if (edit) {
    recipeData = {
      id: -1,
      name: 'sample name',
      tags: [],
      favorited: false,
      ingredients: '1. 2. 3. 4. 5',
      steps: 'sample steps', // ambiguity in naming
      notes: 'sample notes',
    };
    document.getElementById('edit-page-input-name').value = recipeData.name;
    document.getElementById('edit-page-input-ingredients').value = recipeData.ingredients;
    document.getElementById('edit-page-input-steps').value = recipeData.steps;
    document.getElementById('edit-page-input-notes').value = recipeData.notes;
  }

  // anything that needs to be done if add
}

/**
 * Constructs the header and the button functionalities depending on whether it's edit or add
 * @param {boolean} edit - whether the user is editing or adding a new recipe
 */
function constructHeader(edit = true) {
  // construct edit/add header
  const backButton = document.getElementById('edit-page-back-button');
  backButton.addEventListener('click', function () {
    console.log('returning to the previous page...');
  });

  const saveButton = document.getElementById('edit-page-save-button');
  saveButton.addEventListener('click', function () {
    // TODO: check if name is blank, if so alert user and don't save
    console.log('saving the following data');
    console.log(document.getElementById('edit-page-input-name').value);
    console.log(document.getElementById('edit-page-input-ingredients').value);
    console.log(document.getElementById('edit-page-input-steps').value);
    console.log(document.getElementById('edit-page-input-notes').value);
  });
}
