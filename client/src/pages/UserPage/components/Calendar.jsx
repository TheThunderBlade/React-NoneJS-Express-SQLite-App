import React from 'react';
import Calendar from 'react-calendar'

const CalendarComp = props => {
    return (
        <div className='CalendarSection'>
            <Calendar
                className='CalendarFrom'
                onChange={props.setDateFrom}
                value={props.dateFrom}
            />
            <Calendar
                className='CalendarTo'
                onChange={props.setDateTo}
                value={props.dateTo}
            />

            <div className='ButtonPart'>
                <button onClick={props.sendTimeInterval} className='Button-Apply'>Apply</button>
                <p>or</p>
                <button onClick={() => props.isCalendarHandler(false)} className='Button-Cancel'>Cancel</button>
            </div>

        </div>
    );
};

export default CalendarComp;