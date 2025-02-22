import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useMenu from "../store/reduxHooks/useMenu";

const useCustomTitle = () => {
	const htmlTitle = document.querySelector("title") as HTMLTitleElement;
	const { pathname } = useLocation();
	const { menuList } = useMenu();
	const [title, setTitle] = useState(htmlTitle.innerHTML);

	useEffect(() => {
		menuList.forEach((oneDepthMenu) => {
			if (oneDepthMenu.children && oneDepthMenu.children.length > 0) {
				oneDepthMenu.children.forEach((twoDepthMenu) => {
					if (twoDepthMenu.url === pathname) {
						setTitle(twoDepthMenu.name);
					}
					if (twoDepthMenu.children && twoDepthMenu.children.length > 0) {
						twoDepthMenu.children.forEach((threeDepthMenu) => {
							if (threeDepthMenu.url === pathname) {
								setTitle(threeDepthMenu.name);
							}
						});
					}
				});
			}
		});

		htmlTitle.innerHTML = pathname === "/" ? htmlTitle.innerHTML : title;
	}, [htmlTitle, menuList, pathname, title]);
};

export default useCustomTitle;
