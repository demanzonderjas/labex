export function getMeta(name) {
	const element = document.querySelector(`meta[name="${name}"]`);
	return element ? element.getAttribute("content") : "";
}
