import test from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein } from '..algorithms/levenshtein.js';

test('kitten => sitting is 3', () => {
    assert.equal(levenshtein('kitten', 'sitting'), 3);
});

// test('', () => {
//     assert.equal(levenshtein('', ''), 0);
// });

// test('', () => {
//     assert.equal(levenshtein('', ''), 0);
// });

// levenshtein('abc', '')
// levenshtein('', 'abc')
// levenshtein('same', 'same')
// levenshtein('kitten', 'sitting')
// levenshtein('databse', 'database')
// levenshtein('abc','xyz')
// levenshtein('xyz','abc')