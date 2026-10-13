
 // A tree where each node is one letter; the path from the root spells a word.
 // All words sharing a prefix share the path.

class Node {
    constructor(value = '') {
        this.children = new Map(); // Contains this node's child nodes
        this.value = value; // The letter this node represents
        this.values = new Set(); // Values associated with the complete word
        this.endOfWord = false; // Whether this node ends a word
        this.word = null; // Original spelling of the complete word
    }
}

export class Trie {
    constructor() {
        this.root = new Node();
    }
    // O(L) average time, where L is the word length.
    insert(word, value) {
        if (typeof word !== 'string' || !word.trim()) {
            return false;
        }

        const originalWord = word.trim();
        const normalizedWord = originalWord.toLowerCase();

        let currNode = this.root;

        for (const letter of normalizedWord) {
            if (!currNode.children.has(letter)) {
                currNode.children.set(letter, new Node(letter));
            }

            currNode = currNode.children.get(letter);
        }

        currNode.endOfWord = true;
        currNode.word = originalWord;
        currNode.values.add(value);

        return currNode;
    }
    // O(p) average time, where p is the prefix length.
    findPrefix(prefix) {
        if (typeof prefix !== 'string') {
            return null;
        }

        prefix = prefix.toLowerCase();
        let currNode = this.root;

        for (const letter of prefix) {
            if (!currNode.children.has(letter)) {
                return null;
            }

            currNode = currNode.children.get(letter);
        }

        return currNode;
    }


    collectWords(node, results, limit, seen) {
        if (results.length >= limit) {
            return;
        }

        if (node.endOfWord) {
            for (const value of node.values) {
                if (results.length >= limit) {
                    return;
                }


                if (seen.has(value)) {
                    continue;
                }

                seen.add(value);

                results.push({
                    word: node.word,
                    value: value
                });
            }
        }

        for (const child of node.children.values()) {
            if (results.length >= limit) {
                return;
            }

            this.collectWords(child, results, limit, seen);
        }
    }

    /*
    * Returns an array of { word, value } objects.
    * word  = the course name used for this Trie entry
    * value = the course code
    *
    * An empty prefix returns the first matching entries up to limit.
    * Complexity: O(p + V), where p is prefix length and V is the
    * number of Trie nodes visited during result collection.
    */
    search(prefix, limit = 10) {
        if (typeof prefix !== 'string') {
            return [];
        }

        if (!Number.isInteger(limit) || limit <= 0) {
            return [];
        }

        prefix = prefix.trim().toLowerCase();

        const startNode = this.findPrefix(prefix);

        if (!startNode) {
            return [];
        }

        const results = [];
        const seen = new Set();

        this.collectWords(startNode, results, limit, seen);

        return results;
    }

    hasWord(word) {
        if (typeof word !== 'string' || !word.trim()) {
            return false;
        }

        word = word.trim().toLowerCase();

        const currNode = this.findPrefix(word);

        return currNode !== null && currNode.endOfWord;
    }
}