import React, { useState } from "react";
import styles from "./App.module.scss";
import MainTab from "./pages/MainTab/MainTab";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "./widgets/Header/Header";


const App = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Header setLoading={setLoading}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainTab loading={loading} setLoading={setLoading}/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </BrowserRouter>
        </div>
    );
};

export default App;
