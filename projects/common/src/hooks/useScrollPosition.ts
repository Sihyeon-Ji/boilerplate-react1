import { useDeferredValue, useEffect, useState } from "react";

const useScrollPosition = () => {
	const [positionX, setPositionX] = useState(0);
	const [positionY, setPositionY] = useState(0);
	// 자체적인 React 18의 debounce 기능을 선택적으로 해주는 hook
	const defferedPositionX = useDeferredValue(positionX);
	const defferedPositionY = useDeferredValue(positionY);

	useEffect(() => {
		const onScroll = () => {
			setPositionX(window.scrollX);
			setPositionY(window.scrollY);
		};
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	return { positionX: defferedPositionX, positionY: defferedPositionY };
};

export default useScrollPosition;
