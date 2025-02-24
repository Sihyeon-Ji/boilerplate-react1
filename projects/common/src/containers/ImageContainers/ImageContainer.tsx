import React, { CSSProperties, ReactNode, useMemo } from "react";
import LazyLoad from "react-lazy-load";

interface ImageContainerProps {
	src: string;
	height?: number | "auto";
	width?: number | "auto";
	className?: string;
	onClick?: () => void;
	children?: ReactNode;
	style?: CSSProperties;
	loading?: boolean;
}

const ImageContainer = ({
	src,
	height = "auto",
	width = "auto",
	onClick,
	className,
	children,
	style,
	loading = false,
}: ImageContainerProps) => {
	const wrappedStyle = useMemo(() => {
		const returnValue: Record<string, string | number> = { height };
		if (width) returnValue["width"] = width;
		return returnValue;
	}, [width, height]);
	return (
		<div
			className={className ?? ""}
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && onClick?.()}
			role="button"
			tabIndex={0}
		>
			{loading ? (
				<div className="h-full w-full animate-pulse rounded-md bg-gray-200" />
			) : (
				<LazyLoad {...wrappedStyle} threshold={0.01}>
					<img src={src} alt="이미지" {...wrappedStyle} style={style} />
				</LazyLoad>
			)}
			{children}
		</div>
	);
};

export default ImageContainer;
