import { useEffect, useState } from "react";
import { useSelectCommonCodeListQuery } from "../queries/codeQuery";
import { SelectCodeResponse } from "../types/code";

/**
 * ANCHOR - 공통 코드 조회 custom hook
 * @param {string} grpCd 필요한 그룹코드를 ,를 구분자로 붙여서 쭉 나열한다
 * @returns { Record<string, SelectCodeResponse[]> } 공통코드들이 들어있는 하나의 객체
 * @example const commonCodeList = useCommonCode("RO_TYP_CD,CALC_TYP_CD");
 * @example 	useEffect(() => {
					console.info(commonCodeList);
				}, [commonCodeList]);
 */
export const useCommonCode = (
	grpCd: string,
): Record<string, SelectCodeResponse[]> => {
	const [result, setResult] = useState<Record<string, SelectCodeResponse[]>>(
		{},
	);

	const { isLoading, data, isError } = useSelectCommonCodeListQuery(grpCd);

	useEffect(() => {
		if (!isError && !isLoading && data) {
			setResult(data.data);
		}
	}, [data, isError, isLoading]);

	return result;
};
