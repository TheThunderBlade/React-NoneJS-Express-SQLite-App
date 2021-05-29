import React from 'react';
import './Common.scss'
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <div className='Header'>
            <div className='LogoSection'>
                <NavLink to='/'>AppCo</NavLink>
            </div>
            <div className='Location'>
                <p className='DisabledLocation'>Main page >&nbsp;</p>
                <p className={!props.userName ? 'ActiveLocation' : 'DisabledLocation'}> {props.location}</p>
                {
                    props.userName ?  <p className='ActiveLocation'> > {props.userName.first_name} {props.userName.last_name}</p> : null
                }
            </div>
        </div>
    );
};

export default Header;