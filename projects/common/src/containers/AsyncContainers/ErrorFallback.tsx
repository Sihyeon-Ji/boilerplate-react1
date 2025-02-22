import React from "react";

const ErrorFallback = ({
	error,
	resetBoundary,
}: {
	error: Error;
	resetBoundary: () => void;
}) => {
	return (
		<div id="error-page">
			<div>
				<p>오류가 발생했어요!</p>
				<pre>{error.message}</pre>
				<button onClick={resetBoundary}>재시도</button>
			</div>
		</div>
	);
};

export default ErrorFallback;
