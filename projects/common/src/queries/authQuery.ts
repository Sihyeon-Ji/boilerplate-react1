import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "@common/api/authApi";
import useUser from "@common/store/reduxHooks/useUser";
import { useNavigate } from "react-router-dom";

/**
 * ANCHOR 공통 > 인증
 */

//NOTE 로그인
export const useSignInQuery = () => {
	//NOTE - 로그인 useMutation
	const { mutate } = useMutation({ mutationFn: signIn });
	return {
		mutate,
	};
};

//NOTE 로그아웃
export const useSignOutQuery = () => {
	const { initUser } = useUser();
	const navigate = useNavigate();
	//NOTE - 로그아웃 useMutation
	const { mutate } = useMutation({
		mutationFn: signOut,
		onSuccess: async () => {
			await initUser();
			navigate(`/sign-in`);
		},
	});
	return { mutate };
};
