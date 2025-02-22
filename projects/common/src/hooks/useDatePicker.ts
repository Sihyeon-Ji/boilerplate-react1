import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";

export const useDatePicker = (startDt: Dayjs = dayjs()) => {
	const [date, setDate] = useState<Dayjs>(startDt);

	const handleDateChange = useCallback((newValue: Dayjs | null) => {
		if (!newValue) return;
		setDate(newValue);
	}, []);

	return {
		date,
		setDate,
		handleDateChange,
	};
};
