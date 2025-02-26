import React from "react";
import { Button } from "@common/components/ui/button";

//ANCHOR - ErrorPage
// 역할: ErrorFallback보다 더 상세한 에러 페이지, 네비게이션 기능 포함
const ErrorPage = ({
	error,
	resetBoundary,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
	resetBoundary: () => void;
}) => {
	return (
		<div id="error-page">
			<div>
				<div className="number">{error?.response?.status as number}</div>
				<div className="text">
					<br />
					{error?.message ? "오류가 발생했습니다." : ""}
				</div>
				<Button
					variant="default"
					onClick={resetBoundary}
					className="reset-button m-1"
				>
					새로고침
				</Button>
				<Button
					variant="default"
					onClick={() => (location.href = "/")}
					className="reset-button m-1"
				>
					메인으로
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
