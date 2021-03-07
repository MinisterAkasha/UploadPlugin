export const createElement = (tag, classes = [], content = '') => {
	const node = document.createElement(tag);
	if (classes.length) {
		node.classList.add(...classes);
	}
	node.textContent = content;
	return (node);
}