import { useCallback } from "react";

export const useLocalStorage = () => {
	const setItem = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(key: string, value: any) =>
			localStorage.setItem(key, JSON.stringify(value)),
		[],
	);

	const getItem = useCallback((key: string) => {
		const item = localStorage.getItem(key);
		if (!item) return item;
		return JSON.parse(item);
	}, []);

	const removeItem = useCallback(
		(key: string) => localStorage.removeItem(key),
		[],
	);

	return { setItem, getItem, removeItem };
};
