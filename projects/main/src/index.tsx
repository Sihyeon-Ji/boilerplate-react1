import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@common/store/redux";
import "@common/assets/css/index.css";
// import reportWebVitals from '@common/reportWebVitals'

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<Provider store={store}>
		<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
);

// Easily measure performance metrics in JavaScript
// reportWebVitals(console.log);

// 프론트 배포하는 도중 화면을 열어놓고 있는 사용자가 있다면,
// 새로고침 시켜서 "Failed to fetch dynamically imported module" 방지하기
window.addEventListener("vite:preloadError", () => {
	window.location.reload();
});
