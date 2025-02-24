import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import useInitWithScrollToTop from "@common/hooks/useInitWithScrollToTop";
import useLoading from "@common/store/reduxHooks/useLoading";

interface PageContainerProps {
	children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
	useInitWithScrollToTop();
	//SECTION - global 로딩 처리
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();
	const { isLoading, setLoading } = useLoading();

	useEffect(() => {
		if ((isFetching > 0 || isMutating > 0) && isLoading === false) {
			setLoading(true);
		} else if (isFetching == 0 && isMutating == 0 && isLoading === true) {
			setLoading(false);
		}
	}, [isFetching, isMutating, isLoading, setLoading]);
	//!SECTION

	return <div className="page-container">{children}</div>;
};

export default PageContainer;
