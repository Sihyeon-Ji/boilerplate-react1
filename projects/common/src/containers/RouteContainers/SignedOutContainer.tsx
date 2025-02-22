import React, { ReactNode, useEffect } from "react";
import useNavigation from "../../hooks/useNavigation";
import { useCookies } from "react-cookie";
import useUser from "../../store/reduxHooks/useUser";

interface SignedOutContainerProps {
	children: ReactNode;
}

// 유저 정보가 있을 때 로그인, 회원가입 등의 페이지 접근을 막는다.
const SignedOutContainer = ({ children }: SignedOutContainerProps) => {
	const { navigate } = useNavigation();
	const { user } = useUser();
	const [cookie] = useCookies(["seodalgo_user"]);
	useEffect(() => {
		if (cookie?.seodalgo_user === user.email) {
			navigate({
				url: "/",
				origin: import.meta.env.VITE_MAIN_URL,
			});
		}
	}, [cookie?.seodalgo_user, user.email, navigate]);
	return <>{children}</>;
};

export default SignedOutContainer;
