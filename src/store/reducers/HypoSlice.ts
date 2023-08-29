import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHypoState } from "../../models/hypo.interface";

const initialState: IHypoState = {
	list: [],
	isLoading: false,
};

export const hypoSlice = createSlice({
	name: "hypo",
	initialState,
	reducers: {
		hypoListFetching(state) {
			state.isLoading = true;
		},
		hypoListFetchingSuccess(state, action: PayloadAction<Partial<IHypoState>>) {
			console.log(action.payload);
			state.list = action.payload.list || [];
			state.isLoading = false;
		},
	},
});

export default hypoSlice.reducer;
