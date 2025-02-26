import React, { useEffect } from "react";

//ANCHOR - InvalidApproach
// 역할: 비정상적인 접근(예: 존재하지 않는 경로)에 대한 처리 페이지
// 2초 후 메인 페이지로 자동 리다이렉트

const InvalidApproach = ({ timeoutMs = 2000 }: { timeoutMs?: number }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			location.href = `${import.meta.env.VITE_MAIN_URL}`;
		}, timeoutMs);
		return () => clearTimeout(timeout);
	}, [timeoutMs]);

	return (
		<div id="error-page">
			<div className="text">
				비정상적인 접근입니다. <br />
				잠시 후 메인 페이지로
				<br /> 이동합니다.
			</div>
		</div>
	);
};

export default React.memo(InvalidApproach);
