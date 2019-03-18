const deriveOffset = (offset, unit, fontSize) =>
	unit === 'rem' || unit === 'em' ? offset * fontSize : offset;

export const getWaypointOffset = (unit, fontSize) => (offset, padding) => {
	const unitOffset = offset - padding;
	const waypointOffset = deriveOffset(unitOffset, unit, fontSize);
	return waypointOffset;
};

export const isBottomInView = element => {
	if (!element) {
		return false;
	}
	const rect = element.getBoundingClientRect();
	const height = window.innerHeight || document.documentElement.clientHeight;
	return rect.top <= height / 2;
};

export const isTopInView = element => {
	if (!element) {
		return false;
	}
	const rect = element.getBoundingClientRect();
	const height = window.innerHeight || document.documentElement.clientHeight;
	return rect.bottom >= height;
};

export const scrollToTop = () => {
	const topPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
	if (topPosition > 0) {
		window.scrollTo(0, 0);
	}
};
