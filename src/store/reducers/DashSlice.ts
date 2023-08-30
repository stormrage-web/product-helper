import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDashState } from "../../models/hypo.interface";

const initialState: IDashState = {
	message: "",
	first_graph: undefined,
	second_graph: undefined,
	thirs_graph: undefined,
	isLoading: false,
};

export const dashSlice = createSlice({
	name: "dash",
	initialState,
	reducers: {
		dashListFetching(state) {
			state.isLoading = true;
		},
		dashListFetchingSuccess(state, action: PayloadAction<Partial<IDashState>>) {
			console.log(action.payload);
			state.message = action.payload.message || "";
			state.first_graph = action.payload.first_graph;
			state.second_graph = action.payload.second_graph;
			state.thirs_graph = action.payload.thirs_graph;
			state.isLoading = false;
		},
	},
});

export default dashSlice.reducer;
