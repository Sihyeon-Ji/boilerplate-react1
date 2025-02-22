import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import removeConsole from "vite-plugin-remove-console";

export default () => {
	return defineConfig({
		plugins: [react(), tsconfigPaths(), removeConsole()],
		server: {
			hmr: {
				overlay: false,
			},
		},
		base: "/",
		build: {
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					assetFileNames: (assetInfo) => {
						const extType = assetInfo.originalFileNames[0]?.split(".").at(1);

						// 이미지 파일 확장자 체크
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(String(extType))) {
							return `assets/img/[name]-[hash][extname]`;
						}
						// CSS 파일 체크
						if (extType === "css") {
							return `assets/css/[name]-[hash][extname]`;
						}
						// 기타 에셋
						return `assets/[ext]/[name]-[hash][extname]`;
					},
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
				},
			},
		},
		envDir: "../common/",
	});
};
