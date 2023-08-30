import { AppDispatch } from "../store";
import { hypoSlice } from "./HypoSlice";
import axios from "axios";
import { dashSlice } from "./DashSlice";

export const mainEndPoint = "http://51.250.91.130:5000/";

export const fetchList =
	({ data_id }: { data_id: string }) =>
		async (dispatch: AppDispatch) => {
			dispatch(hypoSlice.actions.hypoListFetching);
			axios.get(mainEndPoint + "list?data_id=" + data_id).then(result => {
				dispatch(hypoSlice.actions.hypoListFetchingSuccess({ list: result.data }));
			}).catch(error => console.log(error));
		};

export const fetchHypo =
	({ hypothesis_id }: { hypothesis_id: string }) =>
		async (dispatch: AppDispatch) => {
			dispatch(dashSlice.actions.dashListFetching());
			axios.get(mainEndPoint + "hypothesis?hypothesis_id=" + hypothesis_id).then(result => {
				dispatch(dashSlice.actions.dashListFetchingSuccess({ ...result.data }));
			}).catch(error => console.log(error));
		};