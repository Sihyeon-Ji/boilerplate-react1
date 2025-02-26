import { Link, useLocation } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@common/components/ui/navigation-menu";

export function NavHeader() {
	const { pathname } = useLocation();

	// 경로 비교를 위한 더 나은 함수
	const isActive = (path: string) => {
		// 정확히 루트 경로인 경우
		if (path === "/") return pathname === "/";
		// 다른 경로의 경우 하위 경로를 포함할 수 있도록 startsWith 사용
		return pathname.startsWith(path);
	};

	return (
		<NavigationMenu>
			<NavigationMenuList className="**:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium gap-2 *:data-[slot=navigation-menu-item]:h-7">
				<NavigationMenuItem>
					<NavigationMenuLink asChild data-active={isActive("/")}>
						<Link to="/">Home</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild data-active={isActive("/charts")}>
						<Link to="/charts">Charts</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild data-active={isActive("/forms")}>
						<Link to="/forms">Forms</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild data-active={isActive("/login")}>
						<Link to="/sign-in">Login</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
