/**
 * NOTE - 지정된 시간(밀리초) 동안 실행을 지연시키는 Promise를 반환합니다.
 * @param ms 지연시킬 시간 (밀리초)
 */
export const delay = async (ms: number) =>
	new Promise((resolve) => setTimeout(() => resolve(ms), ms));

/**
 * NOTE - 콤마가 포함된 숫자 문자열을 숫자로 변환합니다.
 * 변환할 수 없는 경우 0을 반환합니다.
 * @param x 콤마가 포함된 숫자 문자열
 */
export const parseNumberWithComma = (x: string) =>
	Number(x.replace(/,/g, "")) || 0;

/**
 * NOTE - 지정된 길이의 랜덤 알파벳 문자열을 생성합니다.
 * 대소문자 알파벳만 포함됩니다.
 * @param length 생성할 문자열의 길이
 */
export const generateRandomString = (length: number) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

/**
 * NOTE - 주어진 범위 내의 랜덤 정수를 반환합니다.
 * @param min 최소값 (포함)
 * @param max 최대값 (미포함)
 */
export const getRandomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
	Math.ceil(min);

/**
 * NOTE - HTML 문자열에서 script 태그를 제거하고 순수 텍스트만 추출합니다.
 * null이 입력되거나 파싱 결과가 'null'인 경우 null을 반환합니다.
 * @param htmlString 파싱할 HTML 문자열
 */
export const parseHTMLContent = (htmlString: string | null) => {
	if (!htmlString) return null;
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "text/html");
	for (let i = 0; i < doc.getElementsByTagName("script").length; i++)
		doc.getElementsByTagName("script").item(i)?.remove?.();
	for (let i = 0; i < doc.body.getElementsByTagName("script").length; i++)
		doc.body.getElementsByTagName("script").item(i)?.remove?.();

	if (doc.body.innerText == "null") return null;

	return doc.body.innerText;
};

/**
 * NOTE - HEX 색상 코드를 RGBA 형식으로 변환합니다.
 * @param hex HEX 색상 코드 (#RRGGBB 형식)
 * @param alpha 투명도 값 (0~1)
 */
export const hexToRgba = (hex: string, alpha: number) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * NOTE - 문자열을 카멜 케이스(camelCase) 형식으로 변환합니다.
 * 예: "hello-world" -> "helloWorld"
 * @param str 변환할 문자열
 */
export const toCamelCase = (str: string) => {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};
