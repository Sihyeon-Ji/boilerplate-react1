import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";

export const useDateRangePicker = (
	startDt: Dayjs = dayjs(),
	endDt: Dayjs = dayjs(),
) => {
	const [startDate, setStartDate] = useState<Dayjs>(startDt);
	const [endDate, setEndDate] = useState<Dayjs>(endDt);

	const handleStartDateChange = useCallback(
		(newValue: Dayjs | null) => {
			if (!newValue) return;
			setStartDate(newValue);
			if (dayjs(newValue) > dayjs(endDate)) {
				setEndDate(newValue);
			}
		},
		[endDate],
	);
	const handleEndDateChange = useCallback(
		(newValue: Dayjs | null) => {
			if (!newValue) return;
			setEndDate(newValue);
			if (dayjs(newValue) < dayjs(startDate)) {
				setStartDate(newValue);
			}
		},
		[startDate],
	);

	return {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		handleStartDateChange,
		handleEndDateChange,
	};
};
