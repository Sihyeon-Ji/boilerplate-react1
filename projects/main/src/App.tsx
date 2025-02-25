import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@common/config/reactQueryConfig";
import LoadingContainer from "@common/containers/LoadingContainers/LoadingContainer";
import PageRoutes from "@/config/routeConfig";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageContainer from "@common/containers/PageContainers/PageContainer";
import AsyncContainer from "@common/containers/AsyncContainers/AsyncContainer";
import "@common/styles/index.css";

const App = () => {
	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<LoadingContainer>
					<PageContainer>
						<AsyncContainer>
							<PageRoutes />
						</AsyncContainer>
					</PageContainer>
				</LoadingContainer>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</CookiesProvider>
	);
};

export default App;
