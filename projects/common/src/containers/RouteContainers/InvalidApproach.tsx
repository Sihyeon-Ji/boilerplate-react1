import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ImageContainer from "../../Containers/ImageContainer";
import ImgError from "../../../assets/images/img-404-Error.png";
import Gear1 from "../../../assets/images/Gear1.png";
import Gear2 from "../../../assets/images/Gear2.png";
import Gear3 from "../../../assets/images/Gear3.png";

const InvalidApproach = () => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			location.href = `${import.meta.env.VITE_MAIN_URL}`;
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<Box id="error-page">
			<Box className="error-page-wrap">
				<Box className="ImgLogo404">
					<Box className="ImgLogo">
						<ImageContainer
							className="imgs"
							src={Gear1}
							width={60}
							height={60}
						/>
						<ImageContainer
							className="imgs"
							src={Gear2}
							width={50}
							height={50}
						/>
						<ImageContainer
							className="imgs"
							src={Gear3}
							width={50}
							height={50}
						/>
					</Box>
				</Box>
				<Box className="text">
					비정상적인 접근입니다. <br />
					잠시 후 메인 페이지로
					<br /> 이동합니다.
				</Box>
				<ImageContainer src={ImgError} className="ImgError" width={250} />
			</Box>
		</Box>
	);
};

export default React.memo(InvalidApproach);
