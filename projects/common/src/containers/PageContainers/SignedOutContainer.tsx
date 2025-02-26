import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@common/store/reduxHooks/useUser";

//ANCHOR - SignedOutContainer
// 역할: 로그아웃된 사용자만 접근할 수 있는 페이지를 감싸는 컨테이너
// 로그인 상태면 메인 페이지로 리다이렉트

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
