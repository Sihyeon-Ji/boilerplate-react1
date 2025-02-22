import { SnackbarOrigin, useSnackbar } from "notistack";
import { useCallback } from "react";

const useMessagebar = () => {
	const { enqueueSnackbar } = useSnackbar();

	const enqueue = {
		info: useCallback(
			(message: string, anchorOrigin?: SnackbarOrigin) => {
				enqueueSnackbar(message, { variant: "info", anchorOrigin });
			},
			[enqueueSnackbar],
		),
		success: useCallback(
			(message: string, anchorOrigin?: SnackbarOrigin) => {
				enqueueSnackbar(message, { variant: "success", anchorOrigin });
			},
			[enqueueSnackbar],
		),
		error: useCallback(
			(message: string, anchorOrigin?: SnackbarOrigin) => {
				enqueueSnackbar(message, { variant: "error", anchorOrigin });
			},
			[enqueueSnackbar],
		),
		default: useCallback(
			(message: string, anchorOrigin?: SnackbarOrigin) => {
				enqueueSnackbar(message, { variant: "default", anchorOrigin });
			},
			[enqueueSnackbar],
		),
		warning: useCallback(
			(message: string, anchorOrigin?: SnackbarOrigin) => {
				enqueueSnackbar(message, { variant: "warning", anchorOrigin });
			},
			[enqueueSnackbar],
		),
	};

	return { enqueue };
};

export default useMessagebar;
