import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@common/components/ui/button";

// 페이지 단위에서 사용할 에러바운더리의 fallback
const ErrorPage = ({
	error,
	resetBoundary,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
	resetBoundary: () => void;
}) => {
	const navigate = useNavigate();
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
					onClick={() => navigate(`/`)}
					className="reset-button m-1"
				>
					메인으로
				</Button>
			</div>
		</div>
	);
};

export default React.memo(ErrorPage);
