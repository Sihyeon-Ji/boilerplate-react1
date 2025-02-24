import { axiosInstance } from "@common/config/axiosConfig";
import { SignInReq } from "@common/types/user";

/**
 * SECTION 공통 > 인증
 */

//NOTE 로그인
export const signIn = async (requestBody: SignInReq) => {
	const response = await axiosInstance.post("/auth/signIn", requestBody);
	return response.data;
};

//NOTE 로그아웃
export const signOut = async () => {
	const response = await axiosInstance.post("/auth/signOut");
	return response.data;
};

//!SECTION
