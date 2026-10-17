// a structure where the smallest priority always comes out first. Stored in a plain array shaped like a binary tree
// Insert → O(log n)
// Extract Min → O(log n)
// Peek → O(1)
// push/pop O(log n)
// topK O(N log K)

export class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }
 
    swap(i, j) { //changes objects NOT indexes
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(item, priority) {
        this.heap.push({
            item, 
            priority
        });

        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.heap[parentIndex].priority <= this.heap[index].priority)
                break;

            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    pop() {
        if (this.heap.length === 0)
            return undefined;

        if (this.heap.length === 1) 
            return this.heap.pop().item;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();

        return min.item;
    }

    size() {
        return this.heap.length;
    }

    peek() {
        if (this.heap.length === 0)
            return undefined;

        return this.heap[0].item;
    }

    heapifyDown() {
        let index = 0;

        while (this.getLeftChildIndex(index) < this.heap.length) { // Checks if there is children 
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            let smallerChildIndex = leftChildIndex;

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex].priority < this.heap[leftChildIndex].priority
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[index].priority <= this.heap[smallerChildIndex].priority)
                break;

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
}

export function topK(items, k, scoreFn) {
    const pq = new PriorityQueue();

    if (k <= 0)
        return [];

    for (const item of items) {
        const priority = scoreFn(item);

        pq.push(item, priority);

        if (pq.size() > k) {
            pq.pop();
        }
    }

    const result = [];

    while (pq.size() > 0) {
        result.push(pq.pop());
    }

    return result.reverse();
}