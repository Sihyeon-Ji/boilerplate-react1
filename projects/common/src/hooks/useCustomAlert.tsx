import React, { useCallback } from "react";
import useModal from "@common/src/store/reduxHooks/useModal";
import AlertModal from "../components/Modal/AlertModal";

/**
 * ANCHOR - 공통 alert custom hook
 */
export const useCustomAlert = () => {
	const { openModal } = useModal();

	/**
	 * NOTE - alert 창을 띄우는 함수
	 * @param { string } message alert 창에 표시할 메세지
	 */
	const customAlert = useCallback(
		(message: string) => {
			openModal(<AlertModal message={message} />);
		},
		[openModal],
	);

	return customAlert;
};
