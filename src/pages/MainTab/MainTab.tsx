import React from "react";
import styles from "./MainTab.module.scss";
import { useAppSelector } from "../../hooks/redux";
import ASide from "../../widgets/ASide/ASide";
import Dashboard from "../../widgets/Dashboard/Dashboard";

const MainTab = () => {
	const { isLoading, list } = useAppSelector(
		(state) => state.hypoReducer,
	);
	const dash = useAppSelector(
		(state) => state.dashReducer,
	);

	return (
		<div className={styles.wrapper}>
			<ASide list={list} isLoading={isLoading} />
			<Dashboard {...dash} />
		</div>
	);
};

export default MainTab;
