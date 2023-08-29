import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Button, message, Modal, Upload, UploadProps } from "antd";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks/redux";
import { fetchList } from "../../store/reducers/ActionCreators";

const { Dragger } = Upload;

const Header = () => {
	const dispatch = useAppDispatch();
	const [dataId, setDataId] = useState("");

	const props: UploadProps = {
		name: "file",
		maxCount: 1,
		action: "http://51.250.91.130:5000/upload",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				// console.log(info.file, info.fileList);
			}
			if (status === "done") {
				if (info.file.response.id)
					setDataId(info.file.response.id);
				message.success(`${info.file.name} загружен успешно.`);
			} else if (status === "error") {
				message.error(`${info.file.name} не загрузился.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	const handleOk = () => {
		if (dataId) {
			dispatch(fetchList({ data_id: dataId }));
			setModalActive(false);
		}
		else
			message.error("Загрузите файл");
	};

	const [modalActive, setModalActive] = useState(false);
	return (
		<>
			<div className={styles.wrapper}>
				{/*<Select*/}
				{/*	defaultValue="lucy"*/}
				{/*	style={{ width: 306 }}*/}
				{/*	options={options}*/}
				{/*/>*/}
				<Button type="primary" icon={<SearchOutlined />} onClick={() => setModalActive(true)}>
					Загрузить данные
				</Button>
			</div>
			<Modal title="Загрузка данных" open={modalActive} onOk={handleOk} onCancel={() => setModalActive(false)}>
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibited from uploading company data or other
						banned files.
					</p>
				</Dragger>
			</Modal>
		</>
	);
};

export default Header;