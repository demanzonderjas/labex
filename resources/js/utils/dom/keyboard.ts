export function blockEnter(e) {
	const key = e.charCode || e.keyCode || 0;
	const ENTER_KEYCODE = 13;
	if (key == ENTER_KEYCODE) {
		e.preventDefault();
	}
}
