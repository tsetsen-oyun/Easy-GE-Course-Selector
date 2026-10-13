
import { readFile } from 'node:fs/promises';
import { Trie } from '../src/algorithms/trie.js';

async function main() {
    const file = await readFile(
        new URL('../data/courses.json', import.meta.url),
        'utf8'
    );

    const courses = JSON.parse(file);
    const trie = new Trie();

    for (const course of courses) {
        trie.insert(course.courseName, course);
    }

    const results = trie.search('data', 10);

    for (const result of results) {
        console.log('Course name:', result.word);
        console.log('Course code:', result.value.courseCode);
        console.log('Professor:', result.value.professor);
        console.log('Credits:', result.value.credits);
        console.log('--------------------');
    }
}

main().catch(error => {
    console.error('Failed to load courses:', error);
});