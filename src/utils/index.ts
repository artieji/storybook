export const workWithClass = (el: any, classname: string, add = true): void => {
	if (el) {

		if (add) {
			el.classList.add(classname);
		} else {

			el.classList.remove(classname);
		}
	}
}



export const getSizeByView = ({ view, width = true, minV = false }: { view: Record<string, boolean> | undefined, width?: boolean, minV?: boolean }) => {
	const widths: Record<string, number> = {
		l: 440,
		m: 300,
		s: 280,
		xs: 240
	};
	const heights: Record<string, number> = {
		l: 578,
		m: 400,
		s: 379,
		xs: 320
	};
	for (const key in view) {
		if (view?.[key]) {
			if (minV && key === 'l') {
				return 0;
			}
			return width ? widths?.[key] : heights?.[key]
		}
	}
	return 0;
}