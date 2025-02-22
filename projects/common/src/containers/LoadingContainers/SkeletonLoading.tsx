import React, { CSSProperties } from "react";
interface SkeletonLoadingProps {
	style?: CSSProperties;
}

const SkeletonLoading = ({ style }: SkeletonLoadingProps) => {
	return <div className="skeleton-container" style={style}></div>;
};

export default React.memo(SkeletonLoading, () => true);
