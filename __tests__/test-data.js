const { expect } = require('@jest/globals');
const {
    get_data, set_data, is_launched_for_the_first_time, DATA_ARRAY_KEY, 
    create_new_data, ID_GENERATOR_KEY, get_selected_data_id, read_data_array
} = require('../source/js/data.js'); 

beforeEach(() => {
    window.localStorage.setItem('key', 'value');
});

afterEach(() => {
    window.localStorage.clear();
})

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

test('get_data() returns null for nonexistent key', () => {
    expect(get_data('key2')).toBe(null) 
});

test('get_data() returns value for existing key', () => {
    expect(get_data('key')).toBe('value');
});

test('is_launched_for_the_first_time() triggers when theres no data', () => {
    window.localStorage.clear();
    expect(is_launched_for_the_first_time()).toBe(true);
});

test('is_launched_for_the_first_time() does not trigger normally', () => {
    window.localStorage.setItem(DATA_ARRAY_KEY, 'some recipes');
    expect(is_launched_for_the_first_time()).toBe(false);
});

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
    raw_recipe_array = read_data_array();
    expect(raw_recipe_array.length).toBe(2);
    expect(raw_recipe_array[0].name).toBe('name');
    expect(raw_recipe_array[1].name).toBe('name2');
});

test('create_new_data() creates key in local storage on first call', () => {
    expect(window.localStorage.getItem(DATA_ARRAY_KEY)).toBe(null);
    // using read_data_array here bc we assume its correct; unit test it later
    create_new_data('name', 'ingredient', 'step', 'note');
    expect(read_data_array()[0].id).toBe(0);
});