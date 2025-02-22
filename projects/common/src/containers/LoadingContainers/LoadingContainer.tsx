import React, { ReactNode } from "react";
import useLoading from "@common/src/store/reduxHooks/useLoading";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingContainerProps {
	children: ReactNode;
}

const LoadingContainer = ({ children }: LoadingContainerProps) => {
	const { isLoading } = useLoading();

	return (
		<>
			{children}
			{isLoading && <LoadingSpinner />}
		</>
	);
};

export default React.memo(LoadingContainer);
