import pluginJs from "@eslint/js"; // ESLint의 기본 JavaScript 규칙들을 가져옴
import globals from "globals"; // 브라우저 전역 변수(예: window, document)를 허용
import reactPlugin from "eslint-plugin-react"; // React 관련 ESLint 규칙 플러그인
import reactHooksPlugin from "eslint-plugin-react-hooks"; // React Hooks 관련 ESLint 규칙 플러그인
import reactRefreshPlugin from "eslint-plugin-react-refresh"; // React Fast Refresh 규칙 플러그인 (개발 중 핫 리로드 지원)
import tseslint from "typescript-eslint"; // TypeScript ESLint 규칙 플러그인
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query"; // tanstack query 규칙 플러그인
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"; // React 프로젝트에서 접근성을 개선하기 위한 플러그인으로, JSX 코드에서 발생하는 접근성 관련 문제를 감지하고 경고
import * as regexpPlugin from "eslint-plugin-regexp"; // 정규 표현식 규칙 플러그인
import jsdocPlugin from "eslint-plugin-jsdoc"; // jsdoc 규칙 플러그인
// import prettierRecommended from 'eslint-plugin-prettier/recommended'; // prettier 규칙 플러그인
// import tailwindPlugin from "eslint-plugin-tailwindcss"; // tailwindcss 규칙 플러그인

export default [
	{
		// ESLint 검사에서 제외할 패턴
		ignores: [
			"**/dist/**/*",
			"**/build/**/*",
			"**/coverage/**/*",
			"**/node_modules/**/*",
			"yarn.lock",
			".yarn/**/*",
			".pnp.cjs",
			".pnp.loader.mjs",
			"**/README.md",
			"**/sales-v2/**/*", // sales-v2 디렉토리는 임시로 린팅 제외
		],
	},
	{
		settings: {
			react: {
				version: "18.3", //  detect(eslint-plugin-react가 자동 리액트버전탐지)
			},
		},
		files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"], // ESLint가 검사할 파일 확장자 설정
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.commonjs,
				...globals.es6,
				...globals.node,
			},
			parserOptions: {
				sourceType: "module", // ECMAScript 모듈 사용
				ecmaFeatures: {
					jsx: true, // 리액트의 JSX 파싱을 위해서, JSX 지원
				},
				ecmaVersion: "latest", // 최신 ECMAScript 버전 지원
			},
		},
		plugins: {
			reactPlugin, // React ESLint 플러그인
			"react-hooks": reactHooksPlugin, // React Hooks 플러그인
			"react-refresh": reactRefreshPlugin, // React Fast Refresh 플러그인 (개발 중 핫 리로드)
			regexp: regexpPlugin, // 정규 표현식 플러그인
			jsxA11y: jsxA11yPlugin, // React 프로젝트에서 접근성을 개선하기 위한 플러그인으로, JSX 코드에서 발생하는 접근성 관련 문제를 감지하고 경고
			jsdoc: jsdocPlugin, // jsdoc 플러그인, https://github.com//gajus/eslint-plugin-jsdoc
			// prettier: prettierPlugin,  // Prettier 플러그인
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	reactPlugin.configs.flat.recommended,
	jsxA11yPlugin.flatConfigs.recommended,
	...tanstackQueryPlugin.configs["flat/recommended"], // https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
	// ...tailwindPlugin.configs["flat/recommended"],
	// prettierRecommended,
	{
		rules: {
			...pluginJs.configs.recommended.rules, // ESLint 추천 규칙 적용
			...reactPlugin.configs.recommended.rules, // React 추천 규칙 적용
			...reactPlugin.configs["jsx-runtime"].rules, // JSX 런타임 관련 규칙
			...reactHooksPlugin.configs.recommended.rules, // React Hooks 추천 규칙 적용
			"react-refresh/only-export-components": [
				// component 말고 다른 것을 export 했을 때 에러 off
				// off 하지 않으면, export default React.memo(something); 했을 때도 에러 남.
				"off",
				{ allowConstantExport: true },
			],
			"jsdoc/require-description": "warn", // jsdoc 설명 필요
			"react/jsx-no-target-blank": "off", // target="_blank" 보안 경고를 비활성화 (필요 시 사용)
			"no-unused-vars": "off", // 사용 안 한 변수 있으면 에러처리시키는 것 off
			"no-mixed-spaces-and-tabs": 0,
			"no-undef": "off", // 정의되지 않은 변수 사용 경고 off, typescript에서 처리하기 때문에 off해도 됨
			"@typescript-eslint/no-unused-vars": "warn", // 사용 안 한 변수 있으면 에러처리시키는 것 경고로 바꾸기
			"@typescript-eslint/no-explicit-any": "warn", // any 타입 사용 경고
			//'prettier/prettier': 'error',  // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
			// import 플러그인 사용 시 가능
			// "import/first": "error", //모든 import 문장이 다른 코드 이전에 있어야 함을 요구하는 규칙
			// "import/newline-after-import": "error", //import 문장 다음에는 새 줄이 와야 함
			// "import/no-duplicates": "error", //중복된 import 문장을 방지하는 규칙
			// eslint-plugin-unicorn 플러그인 사용 시 가능
			// "unicorn/filename-case": "off", //파일 이름의 케이스(대소문자 패턴)를 강제하는 규칙 off
			// "unicorn/prevent-abbreviations": "off", //축약어 사용피하도록 권장 off
			// "unicorn/no-null": "off", //null 값의 사용을 피하도록 권장 off
			// "unicorn/prefer-query-selector": "off", //querySelector메서드의 사용을 getElementById, getElementsByClassName 등 대신 권장하는 규칙 off
			// "unicorn/better-regex": "off", //더 간결하고 명확한 정규 표현식을 사용하도록 권장하는 규칙 off
			// "unicorn/no-useless-undefined": "off", //불필요하게 undefined를 반환하거나 설정하는 것을 방지하는 규칙 off
			// simple-import-sort 플러그인 사용 시 가능
			// "simple-import-sort/imports": "error", //import 문장의 정렬을 강제하는 규칙
			// "simple-import-sort/exports": "error", //export 문장의 정렬을 강제하는 규칙
			// unused-imports 플러그인 사용시 가능
			// "unused-imports/no-unused-imports": "error", //사용되지 않는 import를 허용하지 않는 규칙입니다
			// "unused-imports/no-unused-vars": [ //사용되지 않는 변수를 허용하지 않는 규칙(특정 패턴(예: _로 시작하는 변수)은 예외로 처리)
			// 	"warn",
			// 	{
			// 		vars: "all",
			// 		varsIgnorePattern: "^_",
			// 		args: "after-used",
			// 		argsIgnorePattern: "^_",
			// 	},
			// ],
		},
	},
];
