import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setLoading as setLoadingAction } from "../reduxSlices/loadingSlice";

const useLoading = () => {
	//NOTE useAppSelector로 redux store에 있는 상태 꺼내기
	const isLoading = useAppSelector((state) => state.loading);

	//NOTE dispatch 함수
	const dispatch = useAppDispatch();

	//SECTION - dispatch로 action을 전달하는 함수들
	const setLoading = useCallback(
		(value: boolean) => {
			dispatch(setLoadingAction(value));
		},
		[dispatch],
	);

	//!SECTION

	return { isLoading, setLoading };
};

export default useLoading;
