import { useEffect, useState } from "react";

const getViewport = () => ({
	width: window.innerWidth,
	height: window.innerHeight,
});

export const useViewport = ({ width = 1400 }: { width?: number }) => {
	const [viewport, setViewport] = useState(getViewport());
	const [isMobile, setIsMobile] = useState(getViewport().width <= width);

	useEffect(() => {
		const handleResize = () => setViewport(getViewport());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setIsMobile(() => window.innerWidth <= width);
	}, [viewport.width, width]);

	return { ...viewport, isMobile };
};
