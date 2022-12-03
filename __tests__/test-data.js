/**
 * @jest-environment jsdom
 */

const { expect } = require('@jest/globals');
const {
    get_data,
    set_data,
    is_launched_for_the_first_time,
    DATA_ARRAY_KEY, 
    create_new_data,
    ID_GENERATOR_KEY,
    get_selected_data_id,
    read_data_array,
    select_data_by_id,
    SELECTED_DATA_ID_KEY,
    get_selected_data,
    overwrite_selected_data,
    delete_selected_data
} = require('../source/js/data.js'); 

beforeEach(() => {
    window.localStorage.setItem('key', 'value');
});

afterEach(() => {
    window.localStorage.clear();
})

/* SET DATA TESTS */

test('set_data() returns nothing', () => {
    expect(set_data('key2', 'value2')).toBe(undefined);
});

test('set_data() stores to local storage', () => {
    set_data('key2', 'value2');
    expect(window.localStorage.getItem('key2')).toBe('value2');
});

test('set_data() updates local storage', () => {
    set_data('key', 'value2');
    expect(window.localStorage.getItem('key')).toBe('value2');
});

/* GET DATA TESTS */

test('get_data() returns null for nonexistent key', () => {
    expect(get_data('key2')).toBe(null) 
});

test('get_data() returns value for existing key', () => {
    expect(get_data('key')).toBe('value');
});

/* IS LAUNCHED FOR THE FIRST TIME TESTS */

test('is_launched_for_the_first_time() triggers when theres no data', () => {
    window.localStorage.clear();
    expect(is_launched_for_the_first_time()).toBe(true);
});

test('is_launched_for_the_first_time() does not trigger normally', () => {
    window.localStorage.setItem(DATA_ARRAY_KEY, 'some recipes');
    expect(is_launched_for_the_first_time()).toBe(false);
});

/* CREATE NEW DATA TESTS */

test('create_new_data() sets ID generator on the first run', () => {
    expect(window.localStorage.getItem(ID_GENERATOR_KEY)).toBe(null);
    const recipe = create_new_data('name', 'ingredient', 'step', 'note');
    expect(window.localStorage.getItem(ID_GENERATOR_KEY)).toBe(String(1));
});

test('create_new_data() creates recipe data object', () => {
    const recipe = create_new_data('name', 'ingredient', 'step', 'note');
    expect(recipe.id).toBe(0);
    expect(recipe.name).toBe(String('name'));
    expect(recipe.ingredients).toBe(String('ingredient'));
    expect(recipe.steps).toBe(String('step'));
    expect(recipe.notes).toBe(String('note'));
});

test('create_new_data() iterates ID generator', () => {
    const recipe = create_new_data('name', 'ingredient', 'step', 'note');
    expect(window.localStorage.getItem(ID_GENERATOR_KEY)).toBe(String(1));
    const recipe2 = create_new_data('name2', 'ingredient2', 'step2', 'note2');
    expect(window.localStorage.getItem(ID_GENERATOR_KEY)).toBe(String(2));
});

test('create_new_data() selects most recent ID', () => {
    const recipe = create_new_data('name', 'ingredient', 'step', 'note');
    expect(get_selected_data_id()).toBe(0);
    const recipe2 = create_new_data('name2', 'ingredient2', 'step2', 'note2');
    expect(get_selected_data_id()).toBe(1);
});

test('create_new_data() stores all created recipes', () => {
    create_new_data('name', 'ingredient', 'step', 'note');
    create_new_data('name2', 'ingredient2', 'step2', 'note2');
    // using read_data_array here bc we assume its correct; unit test it later
    const raw_recipe_array = read_data_array();
    expect(raw_recipe_array.length).toBe(2);
    expect(raw_recipe_array[0].name).toBe('name');
    expect(raw_recipe_array[1].name).toBe('name2');
});

test('create_new_data() creates key in local storage on first call', () => {
    expect(window.localStorage.getItem(DATA_ARRAY_KEY)).toBe(null);
    create_new_data('name', 'ingredient', 'step', 'note');
    // using read_data_array here bc we assume its correct; unit test it later
    expect(read_data_array()[0].id).toBe(0);
});

/* READ DATA ARRAY TESTS */

test('read_data_array() returns empty array if nothing has been initialized', 
() => {
    expect(read_data_array().length).toBe(0);
});

test('read_data_array() returns all data stored as an array', () => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots');
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots');
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott');

    const recipes = read_data_array();

    expect(recipes.length).toBe(3);
    expect(String(recipes[0])).toBe(String(recipe1));
    expect(String(recipes[1])).toBe(String(recipe2));
    expect(String(recipes[2])).toBe(String(recipe3));
});

/* SELECT DATA BY ID TESTS */

test('select_data_by_id() selects the right id', () => {
    select_data_by_id(2);
    expect(window.localStorage.getItem(SELECTED_DATA_ID_KEY)).toBe(String(2));
});

test('select_data_by_id() does nothing if id not a number', () => {
    select_data_by_id('not a number');
    expect(window.localStorage.getItem(SELECTED_DATA_ID_KEY)).toBe(null);
});

/* GET SELECTED DATA ID TESTS */

test('get_selected_data_id() gets the corrects id', () => {
    select_data_by_id(12);
    const id = get_selected_data_id();
    expect(id).toBe(12);
});

test('get_selected_data_id() returns -1 if there is no current id', () => {
    expect(get_selected_data_id()).toBe(-1);
});

/* GET SELECTED DATA FUNCTION TESTS */

test('get_selected_data() returns the template recipe if there is no data',
() => {
    expect(get_selected_data().id).toBe(-1);
    expect(get_selected_data().name).toBe('');
});

test('get_selected_data() returns the template recipe if our selected id does' +
' not match any existing recipe', () => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    select_data_by_id(3); // makes our selected id 3

    const selected_recipe = get_selected_data();

    expect(selected_recipe.id).toBe(-1);
    expect(selected_recipe.name).toBe('');
});

test('get_selected_data() returns correct recipe if id exists in storage', 
() => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    select_data_by_id(2); // makes our selected id 3

    const selected_recipe = get_selected_data();

    expect(selected_recipe.id).toBe(2);
    expect(selected_recipe.name).toBe('r3');
});

/* OVERWRITE SELECTED DATA FUNCTION TESTS */

test('overwrite_selected_data() does nothing there is no data in local storage',
() => {
    overwrite_selected_data()
    expect(get_selected_data().id).toBe(-1);
    expect(get_selected_data().name).toBe('');
});

test('overwrite_selected_data() does nothing if our selected id does not' +
'match any existing recipe', () => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    const recipe4 =  {
        name: 'r4',
        ingredients: 'ingss',
        steps: 'ste',
        notes: 'ns'
    };
    select_data_by_id(3); // makes our selected id 3

    // run overwrite
    overwrite_selected_data(recipe4);

    // get all of our data
    const recipes = read_data_array()

    // check nothing was changed
    expect(recipes.length).toBe(3);
    expect(recipes[0].id).toBe(0);
    expect(recipes[0].name).toBe('r1');
    expect(recipes[1].id).toBe(1);
    expect(recipes[1].name).toBe('r2');
    expect(recipes[2].id).toBe(2);
    expect(recipes[2].name).toBe('r3');
});

test('overwrite_selected_data() updates recipe if selected id is in storage', 
() => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    select_data_by_id(2); // makes our selected id 3

    // check selected data is r3
    let selected_recipe = get_selected_data();
    expect(selected_recipe.id).toBe(2);
    expect(selected_recipe.name).toBe('r3');

    const recipe4 =  {
        name: 'r4',
        ingredients: 'ingss',
        steps: 'ste',
        notes: 'ns'
    };

    // update recipe w/id 2 to the recipe4 object
    overwrite_selected_data(recipe4);
    
    selected_recipe = get_selected_data();
    expect(selected_recipe.id).toBe(2); // id must stay the same
    expect(selected_recipe.name).toBe('r4'); // other attributes will update
});

/* DELETE SELECTED DATA TESTS */

test('delete_selected_data() deletes from our datastore', () => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    select_data_by_id(2);

    delete_selected_data();

    const recipes = read_data_array();

    expect(recipes[0].name).toBe('r1');
    expect(recipes[1].name).toBe('r2');
    expect(recipes.length).toBe(2)
});

test('delete_selected_data() does nothing if there is no data', () => {
    let recipes = read_data_array();
    expect(recipes.length).toBe(0)

    delete_selected_data();

    recipes = read_data_array();
    expect(recipes.length).toBe(0)
});

test('delete_selected_data() does nothing if the selected id doesn\'t match',
() => {
    const recipe1 = create_new_data('r1', 'ings', 'steps', 'nots'); // id 0
    const recipe2 = create_new_data('r2', 'ings', 'steps', 'nots'); // id 1
    const recipe3 = create_new_data('r3', 'ings', 'steps', 'nott'); // id 2
    select_data_by_id(3);

    delete_selected_data();

    const recipes = read_data_array();
    expect(recipes.length).toBe(3)
});