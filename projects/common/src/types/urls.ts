import { JSX, LazyExoticComponent, MemoExoticComponent } from "react";
import URLs from "@common/config/URLConfig";

type URLKeys = keyof typeof URLs;
type URLPaths = (typeof URLs)[URLKeys];
type RouteCondition = "WHENEVER" | "SIGNED_IN" | "SIGNED_OUT";

interface RouteType {
	id: string;
	path: URLPaths;
	routeCondition: RouteCondition;
	component:
		| LazyExoticComponent<() => JSX.Element>
		| LazyExoticComponent<MemoExoticComponent<() => JSX.Element>>;
}

export type { URLPaths, RouteType };
