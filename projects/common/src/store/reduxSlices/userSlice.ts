import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

//NOTE type
export interface UserState {
	id: string;
	name: string;
	email: string;
}

//NOTE initialState
const initialState: UserState = {
	id: "",
	name: "",
	email: "",
};

//NOTE slice (actions & reducer)
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		initUser: (state) => {
			state.id = "";
			state.name = "";
			state.email = "";
		},
	},
	//NOTE persistor.purge 했을 때, 초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => initialState);
	},
});

//NOTE export actions
export const { setUser, initUser } = userSlice.actions;
//NOTE export reducer
export default userSlice.reducer;
