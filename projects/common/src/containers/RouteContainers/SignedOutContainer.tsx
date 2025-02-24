import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@common/store/reduxHooks/useUser";

interface SignedOutContainerProps {
	children: ReactNode;
}

// 유저 정보가 있을 때 로그인, 회원가입 등의 페이지 접근을 막는다.
const SignedOutContainer = ({ children }: SignedOutContainerProps) => {
	const navigate = useNavigate();
	const { user } = useUser();
	useEffect(() => {
		if (user.email) {
			navigate(`/`);
		}
	}, [user.email, navigate]);
	return <>{children}</>;
};

export default SignedOutContainer;
