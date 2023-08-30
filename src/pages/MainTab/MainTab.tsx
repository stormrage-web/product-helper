import React from "react";
import styles from "./MainTab.module.scss";
import { useAppSelector } from "../../hooks/redux";
import ASide from "../../widgets/ASide/ASide";
import Dashboard from "../../widgets/Dashboard/Dashboard";

const MainTab = ({loading, setLoading}: {loading: boolean, setLoading: (x: boolean) => void}) => {
	const { isLoading, list } = useAppSelector(
		(state) => state.hypoReducer,
	);
	const dash = useAppSelector(
		(state) => state.dashReducer,
	);


	return (
		<div className={styles.wrapper}>
			<ASide list={list} isLoading={loading} setLoading={setLoading}/>
			<Dashboard {...dash} />
		</div>
	);
};

export default MainTab;
