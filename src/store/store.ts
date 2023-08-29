import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hypoReducer from "./reducers/HypoSlice";
import dashReducer from "./reducers/DashSlice";

const rootReducer = combineReducers({
	hypoReducer,
	dashReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
