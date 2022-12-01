// test for sanity check
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

// test for importing files and checking functions
const sum = require('../source/js/test-jest.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

