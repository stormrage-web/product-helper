import React from "react";
import styles from "./App.module.scss";
import MainTab from "./pages/MainTab/MainTab";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "./widgets/Header/Header";


const App = () => {

    return (
        <div className={styles.wrapper}>
            <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainTab/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </BrowserRouter>
        </div>
    );
};

export default App;
