import React from 'react';
import phoneImg from "../images/phoneImg.png";
import {NavLink} from "react-router-dom";

const HeaderComp = () => {
    return (
        <div className='MainSection'>
            <div className="HeaderWavyBg">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"> </path>
                </svg>
            </div>

            <h1>AppCo</h1>

            <div className='MainSection__Header'>
                <div>
                    <p className='TitleText'>Brainstorming for desired perfect Usability</p>
                    <p className='SubtitleText'>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</p>
                    <br/>
                    <NavLink to='/stats'>Views Stats</NavLink>
                </div>

                <div>
                    <img src={phoneImg} alt="phone"/>
                </div>
            </div>
        </div>
    );
};

export default HeaderComp;