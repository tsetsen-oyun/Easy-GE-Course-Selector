import test from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein } from '../src/algorithms/levenshtein.js';

test('kitten => sitting is 3', () => {
    assert.equal(levenshtein('kitten', 'sitting'), 3);
});

test('blank => blank is 0', () => {
    assert.equal(levenshtein('', ''), 0);
});

test('abc => blank is 3', () => {
    assert.equal(levenshtein('abc', ''), 3);
});


test('blank => abc is 3', () => {
    assert.equal(levenshtein('', 'abc'), 3);
});

test('same => same is 0', () => {
    assert.equal(levenshtein('same', 'same'), 0);
});

test('databse => database is 1', () => {
    assert.equal(levenshtein('databse', 'database'), 1);
});

test('abc => xyz is 3', () => {
    assert.equal(levenshtein('abc', 'xyz'), 3);
});

test('xyz => abc is 3', () => {
    assert.equal(levenshtein('xyz', 'abc'), 3);
});
