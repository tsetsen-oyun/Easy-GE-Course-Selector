import test from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein } from '../src/algorithms/levenshtein.js';

test('kitten => sitting is 3', () => {
    assert.equal(Levenshtein('kitten', 'sitting'), 3);
});

test('blank => blank is 0', () => {
    assert.equal(Levenshtein('', ''), 0);
});

test('abc => blank is 3', () => {
    assert.equal(Levenshtein('abc', ''), 3);
});


test('blank => abc is 3', () => {
    assert.equal(Levenshtein('', 'abc'), 3);
});

test('same => same is 0', () => {
    assert.equal(Levenshtein('same', 'same'), 0);
});

test('databse => database is 1', () => {
    assert.equal(Levenshtein('databse', 'database'), 1);
});

test('abc => xyz is 3', () => {
    assert.equal(Levenshtein('abc', 'xyz'), 3);
});

test('xyz => abc is 3', () => {
    assert.equal(Levenshtein('xyz', 'abc'), 3);
});
