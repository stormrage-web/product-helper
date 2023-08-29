import React from "react";
import styles from "./ASide.module.scss";
import { IHypoList } from "../../models/hypo.interface";
import { Collapse, CollapseProps, Spin } from "antd";
import { useMediaQuery } from "usehooks-ts";
import classNames from "classnames";
import { useAppDispatch } from "../../hooks/redux";
import { fetchHypo } from "../../store/reducers/ActionCreators";

export interface ASideProps {
	list: IHypoList;
	isLoading: boolean;
}

const ASide = ({ list, isLoading }: ASideProps) => {
	const isMobile = useMediaQuery("(max-width: 1024px)");
	const dispatch = useAppDispatch();

	const items: CollapseProps["items"] = [
		{
			label: "",
			children: <>
				{list.map(item => (
					<div key={item.id} className={styles.item}>
						<span className={styles.item__title}>{item.name}</span>
						<span className={styles.item__proba}>{item.proba * 100}%</span>
					</div>
				))}</>,
		},
	];
	// const toggleCollapsed = () => {
	// 	setCollapsed(!collapsed);
	// };

	const handleItem = (id: string) => {
		dispatch(fetchHypo({ hypothesis_id: id }));
	};

	return isMobile ?
		<Collapse className={classNames(styles.wrapper, styles.mobile)} items={items} defaultActiveKey={["1"]} />
		: (
			<div className={styles.wrapper}>
				<div className={styles.title}>
					Гипотезы
				</div>
				{isLoading && <Spin spinning={true}/>}
				{
					list.map(item => (
						<div key={item.id} className={styles.item} onClick={() => handleItem(item.id)}>
							<span className={styles.item__title}>{item.name}</span>
							<span className={styles.item__proba}>{item.proba * 100}%</span>
						</div>
					))
				}
			</div>
		);
};

export default ASide;