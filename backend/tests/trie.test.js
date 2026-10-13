import test from 'node:test';
import assert from 'node:assert/strict';
import { Trie } from '../algorithms/trie.js';

// Builds a small trie we can reuse: course titles -> course codes
function makeTrie() {
    const trie = new Trie();
    trie.insert('database', 'G0101');
    trie.insert('data', 'G0102');
    trie.insert('systems', 'G0101');
    trie.insert('economics', 'G0201');
    return trie;
}

test('search finds every word that starts with the prefix', () => {
    const trie = makeTrie();
    const results = trie.search('dat');
    const words = results.map((r) => r.word).sort();
    assert.deepEqual(words, ['data', 'database']);
});

test('search returns the course code as value', () => {
    const trie = makeTrie();
    const results = trie.search('econ');
    assert.deepEqual(results, [{ word: 'economics', value: 'G0201' }]);
});

test('unknown prefix returns an empty array', () => {
    const trie = makeTrie();
    assert.deepEqual(trie.search('xyz'), []);
});

test('search is case-insensitive', () => {
    const trie = makeTrie();
    assert.equal(trie.search('DAT').length, 2);
});

test('inserting uppercase words still matches lowercase prefixes', () => {
    const trie = new Trie();
    trie.insert('Database Systems', 'G0101');
    assert.equal(trie.search('database').length, 1);
});

test('the same course code is returned only once', () => {
    const trie = new Trie();
    trie.insert('business', 'G0204');
    trie.insert('basics', 'G0204');   // same course, second word, same prefix 'b'
    const results = trie.search('b');
    assert.equal(results.length, 1);
    assert.equal(results[0].value, 'G0204');
});

test('limit caps the number of results', () => {
    const trie = makeTrie();
    assert.equal(trie.search('d', 1).length, 1);
});

test('limit of 0 or less returns an empty array', () => {
    const trie = makeTrie();
    assert.deepEqual(trie.search('d', 0), []);
    assert.deepEqual(trie.search('d', -3), []);
});

test('empty prefix returns entries up to the limit', () => {
    const trie = makeTrie();
    assert.equal(trie.search('', 2).length, 2);
});

test('a complete word is found by its own full text', () => {
    const trie = makeTrie();
    assert.equal(trie.search('data').some((r) => r.word === 'data'), true);
});

test('hasWord is true only for complete words', () => {
    const trie = makeTrie();
    assert.equal(trie.hasWord('data'), true);
    assert.equal(trie.hasWord('dat'), false);   // only a prefix, not a word
    assert.equal(trie.hasWord('nope'), false);
});

test('insert ignores empty words', () => {
    const trie = new Trie();
    assert.equal(trie.insert('', 'X'), false);
    assert.equal(trie.insert('   ', 'X'), false);
    assert.deepEqual(trie.search(''), []);
});
