import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@common/src/config/reactQueryConfig";
import LoadingContainer from "@common/src/components/ConfigContainers/LoadingContainers/LoadingContainer";
import PageRoutes from "config/routeConfig";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageContainer from "@common/src/components/ConfigContainers/PageContainers/PageContainer";
import AsyncContainer from "@common/src/components/ConfigContainers/AsyncContainers/AsyncContainer";

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
