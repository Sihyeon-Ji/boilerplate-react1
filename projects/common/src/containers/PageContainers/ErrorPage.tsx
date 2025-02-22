import React from "react";
import { Box, Button } from "@mui/material";
import useNavigation from "../../hooks/useNavigation";
import ImageContainer from "../../Containers/ImageContainer";
import SeodalgoImgError from "../../../assets/images/img-gnb-logo1.png";
import SeodalgoImgError2 from "../../../assets/images/img-gnb-logo2.png";
import SeodalgoImgError3 from "../../../assets/images/img-gnb-logo3.png";
import WarningSign from "../../../assets/images/search-tips.png";

// 페이지 단위에서 사용할 에러바운더리의 fallback
const ErrorPage = ({
	error,
	resetBoundary,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
	resetBoundary: () => void;
}) => {
	const { navigate } = useNavigation();
	return (
		<Box id="error-page">
			<Box className="error-page-wrap2">
				<Box className="errorAnimation">
					<ImageContainer src={SeodalgoImgError} className="seodalgoImgError" />
					<ImageContainer
						src={SeodalgoImgError2}
						className="seodalgoImgError"
					/>
					<ImageContainer
						src={SeodalgoImgError3}
						className="seodalgoImgError"
					/>
					<ImageContainer src={WarningSign} className="warningSign" />
				</Box>
				<div className="number">{error?.response?.status as number}</div>
				<div className="text">
					<br />
					{error?.message ? "오류가 발생했습니다." : ""}
				</div>
				<Button
					variant="contained"
					onClick={resetBoundary}
					className="reset-button"
					sx={{ margin: 1 }}
				>
					새로고침
				</Button>
				<Button
					variant="contained"
					onClick={() =>
						navigate({
							url: `/`,
							origin: import.meta.env.VITE_MAIN_URL,
						})
					}
					className="reset-button"
					sx={{ margin: 1 }}
				>
					메인으로
				</Button>
			</Box>
		</Box>
	);
};

export default React.memo(ErrorPage);
