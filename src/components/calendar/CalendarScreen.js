import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { messages } from '../../helpers/calendar-menssages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetAtive, eventStartLoaded } from '../../actions/events';

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale( 'es' );
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { event, eventActive } = useSelector(state => state.calendar );
    const { uid } = useSelector(state => state.auth);

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    useEffect(() => {
        
        dispatch( eventStartLoaded() )
        
    }, [ dispatch ])

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660', 
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        
        return {
            style
        };
    }

    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = ( e ) => {
        dispatch( eventSetAtive (e) );
    }

    const onViewChange = ( e ) => {
        setLastView(e);
        localStorage.setItem( 'lastView', e );
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }
    

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ event }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                (eventActive) && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
