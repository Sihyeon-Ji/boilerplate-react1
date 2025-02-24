import { signOut } from "@common/api/authApi";
import axios, { AxiosError, AxiosResponse } from "axios";
import { persistor } from "@common/store/redux";

export const axiosInstance = axios.create({
	timeout: 2 * 60 * 1000, // 2분
	withCredentials: true,
});

//NOTE
// 동시다발적으로 2개 이상의 요청이 실패했을 때 reissuance 요청을 한 번만 보내기 위한 변수.
// retryDelay를 1ms로 줄이면, isLoading 변수가 의도대로 동작하지 않을 수 있어서
// queryConfig의 retryDelay는 기본값(1000ms)를 사용한다.
let isLoading = false;

axiosInstance.interceptors.response.use(
	(res: AxiosResponse) => {
		return res;
	},
	async (err: AxiosError) => {
		if (err.response?.status == 401 && isLoading == false) {
			//NOTE - 401 (Unauthorized)
			// 액세스 토큰의 유효시간이 만료됨
			// 클라이언트에서 재발급 요청을 하여 JWT를 재발급 받습니다.
			isLoading = true;
			await axiosInstance.post(`/auth/reissuance`); // 재발급
			isLoading = false;
		} else if (err.response?.status == 403) {
			//NOTE - 403 (Forbidden)
			// 액세스 토큰이 블랙리스트에 등록된 경우(로그인 정책에 따라 타 PC에서 새로운 토큰을 발급 받았을 경우)
			// 리프레시 토큰이 Redis에 없는 경우
			// CORS가 유효하지 않은 경우
			await signOut(); // 로그아웃 요청
			persistor.purge(); // 리덕스 초기화
			alert("다른 PC에서 로그인 하였습니다. 확인 후 다시 로그인 해주세요.");
			location.href = `${import.meta.env.VITE_MAIN_URL}/sign-in`;
		} else if (err.response?.status == 412) {
			//NOTE - 412 (Precondition Failed)
			// 헤더 정보에 쿠키가 없는 경우(헤더 정보에 토큰이 없는 경우)
			// 헤더 정보 파싱 구간에서 알 수 없는 예외 발생 시
			await signOut(); // 로그아웃 요청
			persistor.purge(); // 리덕스 초기화
			alert("로그아웃 되었습니다. 확인 후 다시 로그인 해주세요.");
			location.href = `${import.meta.env.VITE_MAIN_URL}/sign-in`;
		}
		return Promise.reject(err);
	},
);

axiosInstance.defaults.baseURL = import.meta.env.VITE_GATEWAY_URL ?? "/";
