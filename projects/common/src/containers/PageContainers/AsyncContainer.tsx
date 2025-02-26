import React, { JSX, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "@common/containers/LoadingContainers/LoadingSpinner";

//ANCHOR - AsyncContainer
// 역할: React Query의 QueryErrorResetBoundary와 함께 사용
// Query 에러를 처리하고 Suspense를 통해 로딩 상태를 관리

interface AsyncContainerProps {
	children: JSX.Element | JSX.Element[];
}

const AsyncContainer = ({ children }: AsyncContainerProps) => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary, error }) => (
						<ErrorPage
							resetBoundary={() => resetErrorBoundary()}
							error={error}
						/>
					)}
				>
					<Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
};

export default AsyncContainer;
