import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setError as setErrorAction } from "../reduxSlices/errorSlice";

const useError = () => {
	//NOTE useAppSelector로 redux store에 있는 상태 꺼내기
	const isError = useAppSelector((state) => state.error);

	//NOTE dispatch 함수
	const dispatch = useAppDispatch();

	//SECTION - dispatch로 action을 전달하는 함수들
	const setError = useCallback(() => {
		dispatch(setErrorAction(true));
	}, [dispatch]);

	const setUnError = useCallback(() => {
		dispatch(setErrorAction(false));
	}, [dispatch]);

	//!SECTION

	return { isError, setError, setUnError };
};

export default useError;
