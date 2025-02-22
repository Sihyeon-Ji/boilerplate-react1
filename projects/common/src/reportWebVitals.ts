import { onCLS, onINP, onLCP } from "web-vitals";

// onCLS(): Chromium
// onFCP(): Chromium, Firefox, Safari
// onFID(): Chromium, Firefox (Deprecated)
// onINP(): Chromium
// onLCP(): Chromium, Firefox
// onTTFB(): Chromium, Firefox, Safari

const reportWebVitals = (onPerfEntry) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		onCLS(onPerfEntry);
		onINP(onPerfEntry);
		onLCP(onPerfEntry);
	}
};

export default reportWebVitals;
