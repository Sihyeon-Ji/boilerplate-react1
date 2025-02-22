import { useState, useEffect } from "react";

type PlatformType = "pc" | "mobile" | "tablet";

export const usePlatform = () => {
	const [platform, setPlatform] = useState<PlatformType>("pc");

	useEffect(() => {
		const checkPlatform = (ua?: string) => {
			if (ua === undefined) {
				ua = window.navigator.userAgent;
			}
			// 태블릿 체크를 위한 정규식
			const tabletKeywords = /(iPad|Android(?!.*Mobile)|Tablet|Silk)/i;
			// 모바일 기기 체크를 위한 정규식
			const mobileKeywords =
				/(Android(?=.*Mobile)|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini)/i;

			if (tabletKeywords.test(ua)) {
				return "tablet";
			}
			if (mobileKeywords.test(ua)) {
				return "mobile";
			}
			return "pc";
		};
		setPlatform(checkPlatform());
	}, []);

	return {
		platform,
		isPc: platform === "pc",
		isMobile: platform === "mobile",
		isTablet: platform === "tablet",
	};
};
