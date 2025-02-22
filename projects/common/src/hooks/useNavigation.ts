import type { URLPaths } from "../types/urls";
import { useCallback, useTransition } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

/**
 * 따로 useNavigation hook을 만들어서 사용하는 이유는
 * navigate 가능한 URL을 route 가능한 URL로 제한하고,
 * 자동완성 기능을 이용함으로써 개발의 편의성과 개발자의 휴먼에러를 방지하기 위함이다.
 */

const useNavigation = () => {
	const _navigate = useNavigate();
	const [, startTransition] = useTransition();

	const navigate = useCallback(
		({
			url,
			options,
			origin,
		}: {
			url: URLPaths;
			options?: NavigateOptions;
			origin?: string;
		}) => {
			// origin이 있으면 NavigateOptions를 함께 실어서 보낼 수 없으니 주의
			if (origin) {
				location.href = `${origin}${url}`;
			} else {
				startTransition(() => {
					_navigate(url, options);
				});
			}
		},
		[_navigate],
	);

	const goto = useCallback(
		(num: number) => {
			startTransition(() => {
				_navigate(num);
			});
		},
		[_navigate],
	);

	return { navigate, goto };
};

export default useNavigation;
