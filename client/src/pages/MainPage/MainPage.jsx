import React from 'react';
import './MainPage.scss'
import MainSectionComp from './components/HeaderComp'
import DescriptionComp from "./components/DescriptionComp";
import FooterComp from "./components/FooterComp";

const MainPage = () => {
    return (
        <div>
            <MainSectionComp/>
            <DescriptionComp/>
            <FooterComp/>
        </div>
    );
};

export default MainPage;