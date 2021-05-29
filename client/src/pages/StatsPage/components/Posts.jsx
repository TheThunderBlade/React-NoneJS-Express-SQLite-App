import React from 'react';
import {NavLink} from "react-router-dom";


const Posts = ({posts, loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }

    return (
        <div className='d-flex w-100 justify-content-center'>
            <table>
                <thead>
                <tr className="table-header-row">
                    <td style={{borderTopLeftRadius: '8px'}} className="table-header-element ">Id</td>
                    <td className="table-header-element">First name</td>
                    <td className="table-header-element">Last name</td>
                    <td className="table-header-element">Email</td>
                    <td className="table-header-element">Gender</td>
                    <td className="table-header-element">IP address</td>
                    <td className="table-header-element">Total clicks</td>
                    <td style={{borderTopRightRadius: '8px'}} className="table-header-element">Total page views</td>
                </tr>
                </thead>
                <tbody>
                {
                    posts.map((item, index) => (
                            <tr className='tr-links' key={index}>
                                <td><NavLink to={`/user/${item.id}`}>{item.id}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.first_name}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.last_name}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.email}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.gender}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.ip_address}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.total_clicks}</NavLink></td>
                                <td><NavLink to={`/user/${item.id}`}>{item.total_page_views}</NavLink></td>
                            </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Posts;