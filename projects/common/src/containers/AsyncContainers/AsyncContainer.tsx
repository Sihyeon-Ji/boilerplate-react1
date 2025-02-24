import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "./ErrorFallback";
import LoadingSpinner from "@common/containers/LoadingContainers/LoadingSpinner";

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
						<ErrorFallback
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
