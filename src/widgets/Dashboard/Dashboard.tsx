import React, { useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid, Cell,
	Legend, Line, LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import styles from "./Dashboard.module.scss";
import { IDashState } from "../../models/hypo.interface";
import { circle, hist } from "../../shared/mocks/circle";
import { Tabs, TabsProps } from "antd";

const COLORS = ["#4CA3F3", "#D1D423", "#8844DE", "#ED863C", "#3B4BDC", "#8ED434", "#FF4D4F", "#1CCFC4"];

const Dashboard = ({ message, isLoading, first_graph, second_graph, thirs_graph }: IDashState) => {
	const items: TabsProps["items"] = Object.keys(circle.data).map(item => ({ key: item, label: item }));
	const [activeItem, setActiveItem] = useState<string>(items[0].key);

	return (
		<div className={styles.wrapper}>
			<>
				{message && first_graph && second_graph && thirs_graph && (
					<>
						<div className={styles.item}>
							<div className={styles.desc__title}>Описание</div>
							<div className={styles.desc__content}>{message}</div>
						</div>
						<div className={styles.double}>
							<div className={styles.item}>
								<div className={styles.item__title}>{thirs_graph.name}</div>
								<ResponsiveContainer height={300}>
									<BarChart
										data={Object.entries(JSON.parse(thirs_graph.data as unknown as any).value).map(([key, value]) => ({
											name: value,
											value: (JSON.parse(thirs_graph.data as unknown as any).count as any)[key],
										}))}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis dataKey="value" />
										<Tooltip />
										<Bar dataKey="value" stackId="a" fill={COLORS[1]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
							<div className={styles.item}>
								<div className={styles.item__title}>{second_graph.name}</div>
								<ResponsiveContainer height={300}>
									<BarChart
										data={Object.entries(JSON.parse(second_graph.data as unknown as any).value).map(([key, value]) => ({
											name: value,
											value: (JSON.parse(second_graph.data as unknown as any).count as any)[key],
										}))}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis dataKey="value" />
										<Tooltip />
										<Bar dataKey="value" stackId="a" fill={COLORS[0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
						<div className={styles.item}>
							<div className={styles.item__title}>{first_graph.name}</div>
							<ResponsiveContainer height={300}>
								{first_graph?.type === "circle" ? (
									<PieChart width={400} height={400}>
										<Pie
											dataKey="value"
											isAnimationActive={false}
											data={Object.entries((JSON.parse(first_graph.data as unknown as any) as any)[activeItem]).map(([key, value]) => ({
												name: key,
												value,
											}))}
											cx="50%"
											cy="50%"
											outerRadius={100}
											fill="#8884d8"
											label
										>
											{Object.entries((JSON.parse(first_graph.data as unknown as any) as any)[activeItem]).map(([key, value]) => ({
												name: key,
												value,
											})).map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Legend />
									</PieChart>
								) : first_graph?.type === "hist" ? (
									<BarChart
										data={Object.entries(JSON.parse(first_graph.data as unknown as any).value).map(([key, value]) => ({
											name: value,
											value: (JSON.parse(first_graph.data as unknown as any).count as any)[key],
										}))}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis dataKey="value" />
										<Tooltip />
										<Bar dataKey="value" stackId="a" fill={COLORS[0]} />
									</BarChart>
								) : first_graph?.type === "linear" ? (
									<LineChart
										width={500}
										height={300}
										data={Object.keys((JSON.parse(first_graph.data as unknown as any)[Object.keys((JSON.parse(first_graph.data as unknown as any)))[0]])).map((item) => ({ name: item, ...(Object.keys(JSON.parse(first_graph.data as unknown as any)).map((key => ({ [key]: (JSON.parse(first_graph.data as unknown as any) as any)[key][item] }))).reduce((prev, cur) => (prev[Object.keys(cur)[0]] = cur[Object.keys(cur)[0]], prev), {}))}))}
										margin={{
											top: 5,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis dataKey={Object.keys((JSON.parse(first_graph.data as unknown as any)))[0]} />
										<Tooltip />
										<Legend />
										{Object.keys(JSON.parse(first_graph.data as unknown as any)).map((item, index) => (
											<Line key={item} type="monotone" dataKey={item} stroke={COLORS[index % COLORS.length]} dot={{ r: 0 }} />
										))}
									</LineChart>
								) : <></>}
							</ResponsiveContainer>
							{first_graph?.type === "circle" ? (
								<Tabs items={items} onChange={(tab) => setActiveItem(tab)} />
							) : <></>}
						</div>
					</>)}
			</>
		</div>
	);
};

export default Dashboard;