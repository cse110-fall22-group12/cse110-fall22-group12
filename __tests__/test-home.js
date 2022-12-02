const { expect } = require('@jest/globals');
let {
    add_sample_data, append_recipe_as_child, init
} = require('../source/js/home.js'); 
let data = require('../source/js/data.js'); 

test('add_sample_data() calls create_new_data() 3 times in dev mode', () => {
    // mock the imported data functions we use in our add_sample_data
    data.create_new_data = jest.fn();
    data.is_launched_for_the_first_time = jest.fn();
    // assign a return value for the relevant functions
    data.is_launched_for_the_first_time.mockReturnValueOnce(true);
    // call the function
    add_sample_data(true);
    // check the result
    expect(data.create_new_data.mock.calls.length).toBe(3);
});

test('add_sample_data() doesnt call create_new_data() if not dev mode', () => {
    // mock the imported data functions we use in our add_sample_data
    data.create_new_data = jest.fn();
    data.is_launched_for_the_first_time = jest.fn();
    // assign a return value for the relevant functions
    data.is_launched_for_the_first_time.mockReturnValueOnce(true);
    // call the function
    add_sample_data(false);
    // check the result
    expect(data.create_new_data.mock.calls.length).toBe(0);
});

test('add_sample_data() no create if not on first launch', () => {
    // mock the imported data functions we use in our add_sample_data
    data.create_new_data = jest.fn();
    data.is_launched_for_the_first_time = jest.fn();
    // assign a return value for the relevant functions
    data.is_launched_for_the_first_time.mockReturnValueOnce(false);
    // call the function
    add_sample_data(true);
    // check the result
    expect(data.create_new_data.mock.calls.length).toBe(0);
});

test('append_recipe_as_child() adds recipe-cell to dom', () => {
    // create mock dom element
    const parent = document.createElement('parent-element');
    // call append function 
    append_recipe_as_child(parent, 'recipe-data');
    // check if a cell is appened
    expect(parent.children[0].localName).toBe('recipe-cell')
});

test('append_recipe_as_child() adds recipe-cell to with correct data', () => {
    // create mock dom element
    const parent = document.createElement('parent-element');
    // call append function 
    append_recipe_as_child(parent, 'recipe-data');
    // check if a cell is appened
    expect(parent.children[0].recipe_data).toBe('recipe-data')
});