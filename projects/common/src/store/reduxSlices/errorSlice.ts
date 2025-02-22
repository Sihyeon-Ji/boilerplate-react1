import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//NOTE type
type ErrorState = boolean;

//NOTE initialState
const initialState: ErrorState = false;

//NOTE slice (actions & reducer)
const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		setError: (_state, action: PayloadAction<boolean>) => action.payload,
	},
});

//NOTE export actions
export const { setError } = errorSlice.actions;
//NOTE export reducer
export default errorSlice.reducer;
