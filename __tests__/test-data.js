const { expect } = require('@jest/globals');
const {
    get_data, set_data, is_launched_for_the_first_time, DATA_ARRAY_KEY
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