import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();

	return (
		<>
			<button
				onClick={() => {
					navigate(`/`);
				}}
			>
				메인으로 돌아가기
			</button>
		</>
	);
};

export default React.memo(SignUp);
