import React from 'react';
import StoreContext from "./StoreContext";
import { _Store } from './Store';

// const routes = [
//     { name: 'Popular Movies', path: 'popular' },
//     { name: 'Upcoming Movies', path: 'upcoming' },
//     { name: 'Top Rated Movies', path: 'top_rated' },
// ];

// props: [name, path]
export const NavItem = (props) => {
    return (
        <StoreContext.Consumer>
            {store => (
                <div
                    onClick={() => {
                        // console.log("%cprops.section is: '%s'", "color: red", _Store.getState().section);
                        _Store.dispatch({ type: "NAVIGATE", payload: props.path });
                    }}
                    className={"nav-link" + (_Store.getState().section === props.path ? " selected" : "")}
                >
                    <a href="/#">{props.name}</a>
                </div>
            )}
        </StoreContext.Consumer>
    );
}