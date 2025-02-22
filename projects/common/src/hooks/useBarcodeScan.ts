import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ANCHOR - 공통 바코드 스캔 custom hook
 * @param { number } length 스캔하는 바코드 대상이 몇자리 숫자인지 지정
 * @param { boolean } isTabOpen 바코드 스캔하는 탭에서만 동작하도록 boolean 값 지정
 * @returns { { barcode: string, isScanning: boolean } } 바코드 값과 스캔중인지 반환
 */
export const useBarcodeScan = (length: number, isTabOpen: boolean) => {
	const bufferRef = useRef<string>("");
	const [barcode, setBarcode] = useState<string>("");
	const [isScanning, setIsScanning] = useState<boolean>(false);

	const handleScanning = useCallback(
		(event: KeyboardEvent) => {
			if (isTabOpen) {
				// 바코드 스캐너를 찍으면 숫자가 입력되고 마지막에 항상 Enter키가 입력됨
				if (event.key === "Enter") {
					// Enter 키가 눌리면 스캔이 완료된 것으로 간주
					if (
						bufferRef.current.length == length &&
						/^\d+$/.test(bufferRef.current)
					) {
						// 매개변수 값 만큼 buffer가 차있고 buffer 값이 모두 숫자형이면
						setBarcode(bufferRef.current);
						setIsScanning(false);
					}
					bufferRef.current = "";
				} else {
					// Enter 키가 아닌 경우 버퍼에 추가
					bufferRef.current = bufferRef.current + event.key;
					setIsScanning((prev) => (prev === false ? true : prev));
				}
			}
		},
		[isTabOpen, length],
	);

	useEffect(() => {
		if (isTabOpen) {
			let timeoutId: NodeJS.Timeout;
			if (isScanning) {
				timeoutId = setTimeout(() => {
					bufferRef.current = "";
					setBarcode("");
					setIsScanning(false);
				}, 100); // 100ms 동안 입력이 없으면 스캔 종료
			}
			return () => {
				if (timeoutId) clearTimeout(timeoutId);
			};
		}
	}, [isScanning, isTabOpen]);

	useEffect(() => {
		if (isTabOpen) {
			window.addEventListener("keydown", handleScanning);
			return () => {
				window.removeEventListener("keydown", handleScanning);
			};
		}
	}, [handleScanning, isTabOpen]);

	return { barcode, isScanning };
};
