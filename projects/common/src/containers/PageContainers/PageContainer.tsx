import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import useInitWithScrollToTop from "../../hooks/useInitWithScrollToTop";
import useLoading from "../../store/reduxHooks/useLoading";
import useUser from "../../store/reduxHooks/useUser";
// import ErrorPage from "./ErrorPage";
// import AsyncBoundary from "./AsyncBoundary";
// import { ErrorFallbackProps } from "../AsyncContainers/ErrorFallback";
// import LoadingSpinner from "../LoadingContainers/LoadingSpinner";
// import ProgressBar from "../LoadingContainers/ProgressBar";

interface PageContainerProps {
	children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
	useInitWithScrollToTop();

	//NOTE 권한 없는 계정이   url 직접 입력으로 서비스 접근하려고 할 때
	const { user } = useUser();
	const [cookie] = useCookies(["seodalgo_user"]);
	useEffect(() => {
		// 로그인 되어있고 유저정보 받아왔을때만 판단하기
		if (cookie?.seodalgo_user && user.email.length > 0) {
			if (
				document.location.pathname.startsWith("/royal") &&
				!user.units.includes("R")
			) {
				alert(`인세 접근 권한이 없습니다.`);
				location.href = `${import.meta.env.VITE_MAIN_URL}`;
			} else if (
				document.location.pathname.startsWith("/sales") &&
				!user.units.includes("S")
			) {
				alert(`영업 접근 권한이 없습니다.`);
				location.href = `${import.meta.env.VITE_MAIN_URL}`;
			} else if (
				document.location.pathname.startsWith("/manu") &&
				!user.units.includes("M")
			) {
				alert(`제작 접근 권한이 없습니다.`);
				location.href = `${import.meta.env.VITE_MAIN_URL}`;
			} else if (
				document.location.pathname.startsWith("/logis") &&
				!user.units.includes("L")
			) {
				alert(`물류 접근 권한이 없습니다.`);
				location.href = `${import.meta.env.VITE_MAIN_URL}`;
			} else if (
				document.location.pathname.startsWith("/company") &&
				!user.units.includes("C")
			) {
				alert(`회사관리 접근 권한이 없습니다.`);
				location.href = `${import.meta.env.VITE_MAIN_URL}`;
			}
		}
	}, [cookie?.seodalgo_user, user]);

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

	return (
		<div className="page-container">
			{/* <AsyncBoundary
				suspenseFallback={<LoadingSpinner />}
				errorFallback={({ error, resetBoundary }: ErrorFallbackProps) => (
					<ErrorPage error={error} resetBoundary={resetBoundary} />
				)}
			> */}
			{children}
			{/* </AsyncBoundary> */}
		</div>
	);
};

export default PageContainer;
