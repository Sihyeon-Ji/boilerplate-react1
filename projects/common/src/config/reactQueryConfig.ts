import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 mins
			gcTime: 1000 * 60 * 15, // 15 mins
			retry: (failureCount, error) => {
				const err = error as AxiosError;
				//NOTE - 401 (Unauthorized)
				// 액세스 토큰의 유효시간이 만료됨
				// 클라이언트에서 재발급 요청을 하여 JWT를 재발급 받습니다.
				return err.response?.status == 401 && failureCount == 0;
			},
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			throwOnError: false,
		},
		mutations: {
			retry: (failureCount, error) => {
				const err = error as AxiosError;
				//NOTE - 401 (Unauthorized)
				// 액세스 토큰의 유효시간이 만료됨
				// 클라이언트에서 재발급 요청을 하여 JWT를 재발급 받습니다.
				return err.response?.status == 401 && failureCount == 0;
			},
			throwOnError: false,
			onError: (error) => {
				const err = error as AxiosError;
				const status = err.response?.status;
				switch (status) {
					case 404:
						//NOTE - 404 (Not Found)
						// 클라이언트 요청이 백엔드 서버에 없는 경우
						alert(
							"에러가 발생했습니다. 현상이 지속되면 관리자에게 문의해주세요.",
						);
						break;
					case 406:
						//NOTE - 406 (Not Acceptable)
						// 액세스 토큰 및 리프레시 토큰은 유효함
						// 기능에 대한 사용자 접근 권한이 없는 요청을 할 경우
						// ex) 뷰어(Read) 권한이 쓰기(Write) 기능을 요청함
						alert("접속 권한이 없습니다.");
						break;
					case 500:
						//NOTE - 500 (Internal Server Error)
						// 백엔드 서버가 죽었을 때
						alert(
							"서버에서 요청을 일시적으로 처리할 수 없습니다. 다시 시도해 주세요.",
						);
						break;
					case 503:
						//NOTE - 503 (Service Unavailable)
						// 서버가 요청을 처리할 준비가 안됨
						// Eureka Client가 Server에 재등록 되는 딜레이 시간 동안 발생
						alert(
							"서버에서 요청을 일시적으로 처리할 수 없습니다. 다시 시도해 주세요.",
						);
						break;
					default:
						alert(err.message);
						break;
				}
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			const err = error as AxiosError;
			const status = err.response?.status;
			switch (status) {
				case 404:
					//NOTE - 404 (Not Found)
					// 클라이언트 요청이 백엔드 서버에 없는 경우
					alert(
						"에러가 발생했습니다. 현상이 지속되면 관리자에게 문의해주세요.",
					);
					break;
				case 406:
					//NOTE - 406 (Not Acceptable)
					// 액세스 토큰 및 리프레시 토큰은 유효함
					// 기능에 대한 사용자 접근 권한이 없는 요청을 할 경우
					// ex) 뷰어(Read) 권한이 쓰기(Write) 기능을 요청함
					alert("접속 권한이 없습니다.");
					break;

				case 500:
					//NOTE - 500 (Internal Server Error)
					// 백엔드 서버가 죽었을 때
					alert(
						"서버에서 요청을 일시적으로 처리할 수 없습니다. 다시 시도해 주세요.",
					);
					break;
				case 503:
					//NOTE - 503 (Service Unavailable)
					// 서버가 요청을 처리할 준비가 안됨
					// Eureka Client가 Server에 재등록 되는 딜레이 시간 동안 발생
					alert(
						"서버에서 요청을 일시적으로 처리할 수 없습니다. 다시 시도해 주세요.",
					);
					break;

				default:
					alert(err.message);
					break;
			}
		},
	}),
});
