import test from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein } from '..algorithms/levenshtein.js';

test('kitten => sitting is 3', () => {
    assert.equal(levenshtein('kitten', 'sitting'), 3);
});


