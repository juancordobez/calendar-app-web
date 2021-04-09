import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { eventStartLogout } from '../../actions/events';


export const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const hanldeLogout = () => {

        dispatch( startLogout() );
    
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <button
                className="btn btn-outline-danger"
                onClick={ hanldeLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> salir</span>
            </button>
        </div>
    )
}
