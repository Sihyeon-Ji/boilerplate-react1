import React, { useEffect } from "react";

const InvalidApproach = () => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			location.href = `${import.meta.env.VITE_MAIN_URL}`;
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

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
