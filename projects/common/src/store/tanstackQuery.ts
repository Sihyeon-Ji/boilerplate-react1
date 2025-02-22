import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * ANCHOR - tanstack query 전역상태 설정
 */

export const tanstackQueryStore = <T>(
	queryKey: unknown,
	initialData: T | null = null,
) => {
	return () => {
		const queryClient = useQueryClient();

		const { data } = useQuery({
			queryKey: [queryKey, initialData],
			queryFn: () => Promise.resolve(initialData),
			refetchInterval: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
		});

		function setData(data: Partial<T>) {
			queryClient.setQueryData([queryKey], data);
		}

		function resetData() {
			queryClient.invalidateQueries({
				queryKey: [queryKey],
			});
			queryClient.refetchQueries({
				queryKey: [queryKey],
			});
		}

		return { data, setData, resetData };
	};
};

//NOTE - 사용법
// import React from "react";
// import { tanstackQueryStore } from "@common/src/store/tanstackQuery";
// import { sampleKeys } from "@common/src/constants/queryKey";

// type SampleStateType = {
// 	name: string;
// 	isMale: boolean;
// };

// //                                        비동기 요청 보낼 때 쓰는 쿼리키도 중복되면 안됨
// //                                     !중요! 이 쿼리 키는 모든 곳에서 중복되면 안됨 !중요!
// //                                     common/src/constants/queryKeys.ts 에 정의해서 사용하기
// const useSampleState = tanstackQueryStore<SampleStateType>(sampleKeys.sample().queryKey, {
// 	name: "홍길동",
// 	isMale: true,
// });

// const Component = () => {
// 	const { data, setData, resetData } = useSampleState();

// 	return (
// 		<div>
// 			<input onChange={(e) => setData({ name: e.target.value })} />
// 			<button onClick={resetData}>Reset</button>
// 			<h1>{data?.name}</h1>
// 		</div>
// 	);
// };

// export default Component;
