import React, { ReactNode, useEffect } from "react";
import useNavigation from "../../hooks/useNavigation";
import { useCookies } from "react-cookie";
import { useSignOutQuery } from "../../queries/authQuery";
import useUser from "../../store/reduxHooks/useUser";
import { persistor } from "../../store/redux";
import useMenu from "../../../store/reduxHooks/useMenu";
import LoadingSpinner from "../LoadingContainers/LoadingSpinner";

/**
 * ANCHOR - 로그인 상태 처리 컨테이너
 * 	cookie x, redux x
 * 	정상적으로 모두 로그아웃된 상태
 * 	-> 로그인 페이지로 이동시키기, persistor.purge()해주기
 *
 * 	cookie x, redux o
 * 	발생할 일 없는 상황이라고 판단 됨.
 * 	윗 상황의 처리로 커버 된다.
 *
 * 	cookie o, redux x
 * 	서달고 내부에서 우클릭or휠클릭을 통해 새탭으로 링크열기로 새 탭을 연 상황                        -> 다른 탭의 유저,메뉴정보 불러오기
 * 	서달고는 따로 잘 로그인 된 상황에서, 브라우저 새 탭열기를 별도로 열고 서달고 주소로 접속한 상황  -> 다른 탭의 유저,메뉴정보 불러오기
 * 	사용자가 브라우저 자체를 닫아버리거나, 서달고가 열려있었던 탭을 모두 닫아버린 상황               -> 백엔드에 로그아웃 요청을 보내서 백엔드 서버에 있는 로그인 세션을 끝내줘야 함. accesstoken refreshtoken 처리 등.
 *
 * 	cookie o, redux o
 * 	처리해줄 게 없음
 */

interface SignedInContainerProps {
	children: ReactNode;
}
const SignedInContainer = ({ children }: SignedInContainerProps) => {
	const { navigate } = useNavigation();
	const { user, setUser } = useUser();
	const { setMenuList } = useMenu();
	const [cookie] = useCookies(["seodalgo_user"]);
	const { mutate: signOutMutate } = useSignOutQuery();

	//NOTE - 지금 로그인되어있는 서달고 창 개수를 세기
	useEffect(() => {
		const tabsOpen = localStorage.getItem("tabs-open");
		if (cookie.seodalgo_user) {
			if (tabsOpen == null) {
				localStorage.setItem("tabs-open", "1");
			} else {
				localStorage.setItem("tabs-open", String(parseInt(tabsOpen) + 1));
			}
		}
		window.addEventListener("unload", () => {
			const newTabCount = localStorage.getItem("tabs-open");
			//NOTE - 사용자가 브라우저 자체를 닫아버리거나, 서달고가 열려있었던 탭을 모두 닫아버린 상황 대응
			if (!newTabCount || newTabCount == "0") {
				localStorage.removeItem("seodalgo-user");
			}
			if (newTabCount !== null) {
				localStorage.setItem("tabs-open", String(parseInt(newTabCount) - 1));
			}
		});
	}, [cookie.seodalgo_user]);

	//NOTE - 로그인 상태 처리
	useEffect(() => {
		const seodalgoUser = localStorage.getItem("seodalgo-user");
		const tabsOpen = localStorage.getItem("tabs-open");

		//NOTE - seodalgo_user cookie가 없으면 확실하게 로그아웃이 처리된 상태
		if (!cookie?.seodalgo_user) {
			localStorage.removeItem("seodalgo-user");
			localStorage.removeItem("tabs-open");
			navigate({
				url: "/sign-in",
				options: {
					replace: true,
				},
				origin: import.meta.env.VITE_MAIN_URL,
			});
			persistor.purge();
		}

		//NOTE - 서달고 로그인 창을 두 개 이상 띄워놓은 상태에서
		//       서로 다른 계정으로 동시에 로그인을 한다면
		//       가장 마지막으로 로그인 한 계정으로 모든 탭들의 redux 상태를 업데이트 해주기
		if (seodalgoUser) {
			const parsedSeodalgoUser = JSON.parse(seodalgoUser);
			if (user.email !== String(parsedSeodalgoUser.email)) {
				setUser(parsedSeodalgoUser);
				setMenuList(parsedSeodalgoUser.menuList);
			}
		}

		//NOTE - 아직 redux에 유저 정보가 들어오지 않은 상황
		if (user.email === "") {
			if (seodalgoUser && tabsOpen && parseInt(tabsOpen) > 0) {
				//NOTE - 서달고 탭이 이미 켜져있고
				//       1. 새 탭이 열리는 상황
				//       2. 빈 탭에서 서달고 url로 접근하는 상황
				//       1번과 2번일 때 이미 켜져있는 서달고 탭과 동일하게 새 탭의 redux 전역상태를 update 해주기
				const parsedUser = JSON.parse(seodalgoUser);
				setUser(parsedUser);
				setMenuList(parsedUser.menuList);
			} else if (!tabsOpen || tabsOpen === "0") {
				//NOTE - 사용자가 브라우저 자체를 닫아버리거나, 서달고가 열려있었던 탭을 모두 닫아버린 상황
				//       상단에서 쿠키가 비어있는 경우를 체크하기 때문에 바로 로그아웃 요청을 보내도 됨
				//REVIEW - [2024-08-08] 엣지에서만 제대로 동작하지 않는 상황임.
				signOutMutate();
			}
		}
	}, [
		cookie?.seodalgo_user,
		navigate,
		setMenuList,
		setUser,
		user.email,
		signOutMutate,
	]);

	//NOTE - 브라우저를 모두 닫은 후 다시 서달고를 열었을 때
	//       아직 유저 정보가 들어오지 않은 상태라면 로딩 스피너를 보여주기
	if (user.email === "") return <LoadingSpinner />;
	return <>{children}</>;
};

export default SignedInContainer;
