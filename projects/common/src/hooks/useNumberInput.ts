import { useCallback, useState } from "react";

const useNumberInput = () => {
	const [inputValue, setInputValue] = useState<number>(0);
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const filteredInput = Number(e.target.value.replace(/[^0-9]/g, ""));
			setInputValue(filteredInput);
		},
		[],
	);

	return { inputValue, handleInputChange };
};

export default useNumberInput;
