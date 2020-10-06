/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		if (!this.head && !this.tail) {
			this.head = new Node(val);
			this.tail = this.head;
		} else {
			this.tail.next = new Node(val);
			this.tail = this.tail.next;
		}
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		let newNode = new Node(val);
		if (this.head === null) {
			this.head = new Node(val);
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
		if (this.length === 0) this.tail = this.head;
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		let tempHead = this.head;

		if (!this.head) {
			throw new Error('Empty List');
		} else if (this.length === 1) {
			this.head = null;
			this.tail = null;
			this.length--;
			return tempHead.val;
		}

		while (tempHead.next !== this.tail) {
			tempHead = tempHead.next;
		}

		this.tail = tempHead;
		this.length--;

		return tempHead.next.val;
	}

	/** shift(): return & remove first item. */

	shift() {
		let currNode = this.head;
		if (!this.head) {
			throw new Error('Empty List');
		} else if (this.length === 1) {
			this.head = null;
			this.tail = null;
			this.length--;
			return currNode.val;
		}

		this.head = currNode.next;
		this.length--;

		return currNode.val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		let currNode = this.head;
		while (idx) {
			currNode = currNode.next;
			idx--;
		}
		if (!currNode) throw new Error('Invalid Index');
		return currNode.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		let currNode = this.head;
		while (idx) {
			currNode = currNode.next;
			idx--;
		}
		if (!currNode) throw new Error('Invalid Index');

		currNode.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	_get(idx) {
		let cur = this.head;
		let count = 0;

		while (cur !== null && count != idx) {
			count += 1;
			cur = cur.next;
		}

		return cur;
	}

	insertAt(idx, val) {
		// // if index is not valid throw error
		// if (idx < 0 || idx > this.length) throw new Error('Invalid Index');
		// // if index is zero, use the already built unshift
		// if (idx === 0) return this.unshift(val);
		// // if index is at the end of list, use already built push
		// if (idx === this.length) return this.push(val);

		// // make a new node, find nodes before and after it,
		// // make the before's and after's node.
		// const newNode = new Node(val);
		// const after = this.getAt(idx);
		// const before = this.getAt(idx - 1);
		// newNode.next = after;
		// before.next = newNode;

		// this.length++;
		// return this;

		if (idx > this.length || idx < 0) {
			throw new Error('Invalid index.');
		}

		if (idx === 0) return this.unshift(val);
		if (idx === this.length) return this.push(val);

		// get the one before it
		let prev = this._get(idx - 1);

		let newNode = new Node(val);
		newNode.next = prev.next;
		prev.next = newNode;

		this.length += 1;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		// if indes is not valid throw error
		if (idx < 0 || idx >= this.length) throw new Error('Invalid Index');
		// if index is at the beginning, use the already built shift
		if (idx === 0) return this.shift();
		// if index is at the end, use the already built pop
		if (idx === this.length - 1) return this.pop();

		//get before and after, set before's next to after and remove
		// after's reference from removed node
		const before = this.getAt(idx - 1);
		const removedNode = this.getAt(idx);
		before.next = removedNode.next;
		removedNode.next = null;

		this.length--;
		return removedNode;
	}

	/** average(): return an average of all values in the list */

	average() {
		let currNode = this.head;
		let total = 0,
			count = 0;

		if (!currNode) {
			return 0;
		}

		while (currNode) {
			total += currNode.val;
			count += 1;
			currNode = currNode.next;
		}

		return total / count;
	}
}

module.exports = LinkedList;
