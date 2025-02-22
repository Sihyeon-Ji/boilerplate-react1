/**
 * NOTE Image to Base64
 * @param file 이미지 파일
 * @returns { Promise<string> } base64로 변환된 문자열 프로미스 객체
 * @example
 * (async () => {
 *      const imageData = await imageToBase64(이미지파일);
 * })()
 * <img src={imageData}>
 */
export const imageToBase64 = (file: ArrayBuffer): Promise<string> => {
	return new Promise((res, rej) => {
		const blob = new Blob([file], { type: "image/png" });
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64String = reader.result;
			res(base64String as string);
		};
		reader.onerror = (err) => {
			rej(err);
		};
	});
};

/**
 * NOTE File to Base64
 * @param file
 * @returns { Promise<string> } base64로 변환된 문자열 프로미스 객체
 */
export const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64 = reader.result;
			res(base64 as string);
		};
		reader.onerror = (err) => {
			rej(err);
		};
	});
};
