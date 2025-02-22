import SignedInContainer from "@seodalgo/common/src/components/ConfigContainers/RouteContainers/SignedInContainer";
import SignedOutContainer from "@seodalgo/common/src/components/ConfigContainers/RouteContainers/SignedOutContainer";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { RouteType } from "@seodalgo/common/src/types/urls";
import URLs from "@seodalgo/common/src/config/URLConfig";

// 코드 스플리팅을 위한 lazy import
// Common 공통
const InvalidApproach = lazy(
	() =>
		import(
			"@seodalgo/common/src/components/ConfigContainers/RouteContainers/InvalidApproach"
		),
);

// Main 메인
const Main = lazy(() => import("pages/Main/Main"));
const SignIn = lazy(() => import("pages/SignIn/SignIn"));
const SignUp = lazy(() => import("pages/SignUp/SignUp"));

const routes: RouteType[] = [
	{
		id: "main",
		path: URLs.Main,
		routeCondition: "SIGNED_IN",
		component: Main,
	},
	{
		id: "sign-in",
		path: URLs.SignIn,
		routeCondition: "SIGNED_OUT",
		component: SignIn,
	},
	{
		id: "sign-up",
		path: URLs.SignUp,
		routeCondition: "SIGNED_OUT",
		component: SignUp,
	},
];

const PageRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route, index) => {
					const { path, component: Component, routeCondition, id } = route;
					switch (routeCondition) {
						case "WHENEVER":
							return (
								<Route
									key={index}
									path={path}
									element={
										<div id={id}>
											<Component />
										</div>
									}
								/>
							);
						case "SIGNED_IN":
							return (
								<Route
									key={index}
									path={path}
									element={
										<SignedInContainer>
											<div id={id}>
												<Component />
											</div>
										</SignedInContainer>
									}
								/>
							);
						case "SIGNED_OUT":
							return (
								<Route
									key={index}
									path={path}
									element={
										<SignedOutContainer>
											<div id={id}>
												<Component />
											</div>
										</SignedOutContainer>
									}
								/>
							);
					}
				})}
				<Route path="*" element={<InvalidApproach />} />
			</Routes>
		</BrowserRouter>
	);
};

export default PageRoutes;
