import { AppSidebar } from "@common/components/ui/example/demos/app-sidebar";
import { SidebarInset, SidebarProvider } from "@common/components/ui/sidebar";
import { useCookies } from "react-cookie";
import Header from "@common/components/Header/Header";

export default function SidebarContainer({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [cookie] = useCookies(["sidebar_state"]);
	const defaultOpen = cookie?.sidebar_state === "true";

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<Header />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
