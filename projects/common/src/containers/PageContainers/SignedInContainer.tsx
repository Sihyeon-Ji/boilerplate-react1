import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@common/store/reduxHooks/useUser";
import LoadingSpinner from "@common/containers/LoadingContainers/LoadingSpinner";

//ANCHOR - SignedInContainer
// 역할: 로그인 상태인 경우 페이지 전체를 감싸는 컨테이너
// 로그인 상태가 아닌 경우 로그인 페이지로 리다이렉트

interface SignedInContainerProps {
	children: ReactNode;
}
const SignedInContainer = ({ children }: SignedInContainerProps) => {
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		if (user.email === "") {
			navigate("/sign-in");
		}
	}, [user.email, navigate]);

	if (user.email === "") return <LoadingSpinner />;
	return <>{children}</>;
};

export default SignedInContainer;
