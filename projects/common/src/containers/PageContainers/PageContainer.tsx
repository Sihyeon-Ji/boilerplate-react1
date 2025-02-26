import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import useInitWithScrollToTop from "@common/hooks/useInitWithScrollToTop";
import useLoading from "@common/store/reduxHooks/useLoading";

//ANCHOR - PageContainer
// 역할: 페이지 전체를 감싸는 컨테이너, React Query의 fetch/mutation 상태를 감지하여 전역 로딩 상태 관리
// 페이지 이동 시 스크롤을 맨 위로 이동

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
