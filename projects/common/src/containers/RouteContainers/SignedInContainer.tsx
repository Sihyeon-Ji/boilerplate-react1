import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@common/store/reduxHooks/useUser";
import LoadingSpinner from "@common/containers/LoadingContainers/LoadingSpinner";

interface SignedInContainerProps {
	children: ReactNode;
}
const SignedInContainer = ({ children }: SignedInContainerProps) => {
	const navigate = useNavigate();
	const { user } = useUser();

	if (user.email === "") return <LoadingSpinner />;
	return <>{children}</>;
};

export default SignedInContainer;
