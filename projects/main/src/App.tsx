import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@common/config/reactQueryConfig";
import LoadingContainer from "@common/containers/LoadingContainers/LoadingContainer";
import PageRoutes from "@/config/routeConfig";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageContainer from "@common/containers/PageContainers/PageContainer";
import AsyncContainer from "@common/containers/PageContainers/AsyncContainer";
import "@common/styles/index.css";
import { ThemeProvider } from "@common/containers/ThemeContainers/ThemeProvider";
import { Toaster } from "@common/components/ui/sonner";

const App = () => {
	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AsyncContainer>
						<LoadingContainer>
							<PageContainer>
								<PageRoutes />
								<Toaster />
							</PageContainer>
						</LoadingContainer>
					</AsyncContainer>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</CookiesProvider>
	);
};

export default App;
