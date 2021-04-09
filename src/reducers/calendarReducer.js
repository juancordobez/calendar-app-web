import { types } from "../types/types";
// {
//     id: '',
//     title: '',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '',
//     notes: '',
//     user: {
//         _id: '',
//         name: ''
//     }
// }

const initialState = {
    event: [],
    eventActive: null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventSetAtive:
            return {
                ...state,
                eventActive: action.payload,
            }
    
        case types.eventAddNew:
            return {
                ...state,
                event: [ 
                    ...state.event,
                    action.payload 
                ] 
            }

        case types.eventClearActiveEvent:
        return {
            ...state,
            eventActive: null,
        }

        case types.eventUpdated:
        return {
            ...state,
            event: state.event.map(
                e => ( e.id === action.payload.id ) 
                    ? action.payload 
                    : e
            )
        }

        case types.eventDeleted:
        return {
            ...state,
            event: state.event.filter(
                e => ( e.id !== state.eventActive.id ) 
            ),
            eventActive: null,
        }

        case types.eventLoaded:
            return {
                ...state,
                event: [ ...action.payload ]
            }
           
        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}