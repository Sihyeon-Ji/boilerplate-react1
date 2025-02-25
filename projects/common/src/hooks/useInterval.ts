import { useCallback, useEffect, useRef } from "react";

const useInterval = (callback: () => void, delayInMillis: number) => {
	const savedCallback = useRef<() => void>(() => {});

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	const tick = useCallback(() => {
		savedCallback.current?.();
	}, []);

	// Set up the interval.
	useEffect(() => {
		if (delayInMillis !== null) {
			const id = setInterval(tick, delayInMillis);
			return () => clearInterval(id);
		}
	}, [delayInMillis, tick]);
};

export default useInterval;
