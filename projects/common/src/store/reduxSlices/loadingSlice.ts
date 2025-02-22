import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//NOTE type
type LoadingState = boolean;

//NOTE initialState
const initialState: LoadingState = false;

//NOTE slice (actions & reducer)
const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		setLoading: (_state, action: PayloadAction<boolean>) => action.payload,
	},
});

//NOTE export actions
export const { setLoading } = loadingSlice.actions;
//NOTE export reducer
export default loadingSlice.reducer;
