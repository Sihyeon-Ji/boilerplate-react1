import React, { useCallback } from "react";
import useModal from "@common/src/store/reduxHooks/useModal";
import ConfirmModal from "../components/Modal/ConfirmModal";

/**
 * ANCHOR - 공통 confirm custom hook
 */
export const useCustomConfirm = () => {
	const { openModal } = useModal();

	/**
	 * NOTE - confirm 창을 띄우는 함수
	 * @param { string } message confirm 창에 표시할 메세지
	 * @returns { Promise<boolean> } confirm 창에서 사용자가 예를 누르면 true 반환, 아니오를 누르면 false 반환
	 */
	const customConfirm = useCallback(
		(message: string): Promise<boolean> => {
			return new Promise((resolve) => {
				const handleConfirm = (confirmed: boolean) => {
					resolve(confirmed);
				};

				openModal(
					<ConfirmModal message={message} handleClick={handleConfirm} />,
				);
			});
		},
		[openModal],
	);

	return customConfirm;
};
