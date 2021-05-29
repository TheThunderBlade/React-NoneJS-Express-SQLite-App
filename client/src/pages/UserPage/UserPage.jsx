import React, {useEffect, useState} from 'react';
import Header from "../../сommonСomponents/Header";
import Footer from "../../сommonСomponents/Footer";
import axios from "axios";
import {ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip} from "recharts";
import 'react-calendar/dist/Calendar.css';
import './UserPage.scss'
import CalendarComp from "./components/Calendar";

import calendarImg from './images/calendarImg.png'

const UserPage = props => {
    const getUserId = props.history.location.pathname.split('/')[2].toString()

    const [userFullName, setUserFullName] = useState({})
    const [userStatistic, setUserStatistic] = useState([])

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const [isCalendar, setIsCalendar] = useState(false)

    useEffect(() => {
        const fetchUserFullName = async () => {
            try {
                const response = await axios.post(`/api/user/userFullName`, {
                    userId: getUserId
                })

                setUserFullName(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        const fetchUserStatistic = async () => {
            try {
                const response = await axios.post(`/api/user/userStatistic`, {
                    userId: getUserId
                })
                setUserStatistic(response.data)

            } catch (e) {
                console.log(e)
            }
        }

        fetchUserFullName()
        fetchUserStatistic()

    }, [getUserId])

    const sendTimeInterval = async () => {
        const response = await axios.post('/api/user/getStatisticByInterval', {
            dateFrom: dateFrom.toLocaleDateString().split('.'),
            dateTo: dateTo.toLocaleDateString().split('.'),
            userId: getUserId
        })

        setUserStatistic(response.data)
    }

    return (
        <div>
            <Header location='User statistic' userName={userFullName}/>

            <div className='ChartSection'>

                <div className='UserPart'>
                    <h1>{userFullName.first_name} {userFullName.last_name}</h1>

                    <div>
                        <p>Select date range</p>
                        <img onClick={() => setIsCalendar(!isCalendar)} src={calendarImg} alt="calendar img"/>
                    </div>

                </div>

                {
                    isCalendar ? <CalendarComp
                        setDateFrom={setDateFrom}
                        setDateTo={setDateTo}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        sendTimeInterval={sendTimeInterval}
                        isCalendarHandler={setIsCalendar}
                    /> : null
                }

                <div>
                    <h2>Clicks</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={userStatistic}>
                            <Line type="monotone" dataKey="clicks" stroke="#8884d8"/>
                            <XAxis dataKey="date"/>
                            <YAxis dataKey="clicks"/>
                            <Tooltip/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h2>Views</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={userStatistic}>
                            <Line type="monotone" dataKey="page_views" stroke="#8884d8"/>
                            <XAxis dataKey="date"/>
                            <YAxis dataKey="page_views"/>
                            <Tooltip/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <Footer/>
        </div>
    );
};

export default UserPage;