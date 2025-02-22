import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get("page"));
	const page = isNaN(currentPage) ? 1 : currentPage;
	const handlePageChange = useCallback(
		(_: React.ChangeEvent<unknown>, page: number) => {
			setSearchParams(
				(prev) => {
					prev.set("page", `${page}`);
					return prev;
				},
				{
					replace: true,
				},
			);
		},
		[setSearchParams],
	);

	return { page, handlePageChange };
};
