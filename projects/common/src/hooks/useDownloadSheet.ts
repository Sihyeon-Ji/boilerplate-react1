import { downloadSheetApi } from "../api/downloadSheetApi";
import { useMutation } from "@tanstack/react-query";

/**
 * ANCHOR - seodalgo-sheet-backend 엑셀 다운로드 custom hook
 * @type 제네릭 타입으로 엑셀 data 타입 지정
 * @param {string} fileName 파일명 지정
 * @returns 엑셀 파일
 * @example const { mutateDownloadSheet } = useDownloadSheet<GetLedgerSheet>("장부테스트");
 * 			const handleExcelDownloadButtonClick = () => { mutateDownloadSheet({ url: "/~~", data: {} }) }
 */
export const useDownloadSheet = <T>(fileName: string) => {
	const { mutate: mutateDownloadSheet } = useMutation({
		mutationFn: downloadSheetApi<T>,
		onSuccess: (response) => {
			const blob = response as Blob;
			if (blob.size === 0) {
				alert("오류가 발생했습니다.");
			} else {
				const a = document.createElement("a");
				const currentDt = new Date();
				const currentDtFormat =
					currentDt.getFullYear() +
					"-" +
					(currentDt.getMonth() + 1) +
					"-" +
					currentDt.getDate();
				a.href = window.URL.createObjectURL(blob);
				a.download = fileName + "_" + currentDtFormat + ".xlsx";
				a.click();
				window.URL.revokeObjectURL(a.href);
			}
		},
	});
	return {
		mutateDownloadSheet,
	};
};
