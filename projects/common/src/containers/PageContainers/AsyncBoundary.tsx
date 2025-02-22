import React, { ReactNode, Suspense, useCallback } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { ErrorFallbackProps } from "../AsyncContainers/ErrorFallback";
import useError from "../../store/reduxHooks/useError";

export interface AsyncBoundaryProps {
	errorFallback(props: ErrorFallbackProps): JSX.Element;
	suspenseFallback: ReactNode;
	children: ReactNode;
}

const AsyncBoundary = ({
	suspenseFallback,
	errorFallback,
	children,
}: AsyncBoundaryProps) => {
	const { setError } = useError();

	const resetHandler = useCallback(() => {
		location.reload();
	}, []);

	return (
		<ErrorBoundary
			errorFallback={errorFallback}
			resetHandler={resetHandler}
			setError={setError}
		>
			<Suspense fallback={suspenseFallback}>{children}</Suspense>
		</ErrorBoundary>
	);
};

export default AsyncBoundary;
