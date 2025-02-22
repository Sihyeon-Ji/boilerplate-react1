import { useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { createLogger } from "redux-logger";
import sessionStorage from "redux-persist/lib/storage/session";
import userReducer from "./reduxSlices/userSlice";
import errorReducer from "./reduxSlices/errorSlice";
import loadingReducer from "./reduxSlices/loadingSlice";

/**
 * ANCHOR - 리덕스 전역상태 설정
 */

const logger = createLogger({ predicate: () => import.meta.env.DEV });

const combinedReducers = combineReducers({
	user: userReducer,
	error: errorReducer,
	loading: loadingReducer,
});

const persistConfig = {
	key: "root",
	storage: sessionStorage,
	whitelist: ["user"],
};
const persistedCombinedReducer = persistReducer(
	persistConfig,
	combinedReducers,
);

const store = configureStore({
	reducer: persistedCombinedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(logger),
	devTools: `${import.meta.env.NODE_ENV}` !== "production",
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
export const persistor = persistStore(store);
