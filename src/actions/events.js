import Swal from "sweetalert2";
import { fethConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";



export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;
        try {
            const resp = await fethConToken( 'events', event, 'POST' );
            const body = await resp.json();

            if ( body.ok ) {
                
                event.id = body.msg.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                console.log(event );
                dispatch( eventAddNew( event ) );
                
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetAtive = ( event ) => ({
    type: types.eventSetAtive,
    payload: event
})

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent});


export const eventStartUpdate = ( event ) => {
    return async( dispatch ) => {

        try {
            
            const resp = await fethConToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event,
})

export const eventStartDelete = ( event ) => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.eventActive;

        try {
            
            const resp = await fethConToken( `events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted });


export const eventStartLoaded = () => {
    return async( dispatch ) => {
        try {
            
            const resp = await fethConToken( 'events' );
            const body = await resp.json();
    
            const events = prepareEvents(body.eventos);
    
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = ( eventos ) => ({
    type: types.eventLoaded,
    payload: eventos
})

export const eventLogout = () => ({ type: types.eventLogout })
