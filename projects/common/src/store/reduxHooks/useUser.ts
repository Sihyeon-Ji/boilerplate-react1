import { useCallback } from "react";
import { useAppDispatch, useAppSelector, persistor } from "../redux";
import {
	setUser as setUserAction,
	initUser as initUserAction,
	UserState,
} from "../reduxSlices/userSlice";

const useUser = () => {
	//NOTE useAppSelector로 redux store에 있는 상태 꺼내기
	const user = useAppSelector((state) => state.user);

	//NOTE dispatch 함수
	const dispatch = useAppDispatch();

	//SECTION - dispatch로 action을 전달하는 함수들
	const setUser = useCallback(
		(newUser: UserState) => {
			dispatch(setUserAction(newUser));
		},
		[dispatch],
	);

	const initUser = useCallback(async () => {
		dispatch(initUserAction());
		persistor.purge();
	}, [dispatch]);

	//!SECTION

	return {
		user,
		setUser,
		initUser,
	};
};

export default useUser;
