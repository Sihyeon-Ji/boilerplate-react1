/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{ts,tsx,js,jsx}", // common 프로젝트의 모든 파일
		"../main/src/**/*.{ts,tsx,js,jsx}", // main 프로젝트의 모든 파일
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
