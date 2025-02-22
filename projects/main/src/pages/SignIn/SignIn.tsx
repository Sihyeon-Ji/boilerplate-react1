import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const navigate = useNavigate();

	return (
		<div>
			<form>
				<input type="text" />
				<input type="password" />
				<button
					type="submit"
					onClick={() => {
						navigate(`/main`);
					}}
				>
					로그인
				</button>
				<button
					onClick={() => {
						navigate(`/sign-up`);
					}}
				>
					회원가입
				</button>
			</form>
		</div>
	);
};

export default React.memo(SignIn);
