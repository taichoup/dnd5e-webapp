import React, { useEffect } from 'react'
import { _Store } from './Store';
import StoreContext from './StoreContext';

// we need to pass the desired path as prop
export const Popup = (props) => {

    // useEffect(() => {

    //     async function fetchData() {
    //         const res = await fetch(props.path); // For the hook to work we need to wrap the fetch in an async...await thing.
    //         res
    //             .json()
    //             .then(res => _Store.dispatch({ type: "GETDATA_POPUP", payload: res.data }))
    //             .catch(error => console.log(error.message))
    //     }
    //     fetchData()
    // }, [props.path]);

    return (
        <StoreContext.Consumer>
            {store =>
                < div className="modal" >
                    {/* <div className="modal-content">
                        <p>{_Store.getState().popupdata ? _Store.getState().popupdata.toString() : "No data yet."}</p>
                        <button className="close-button" onClick={props.close}>&times;</button>
                    </div> */}
                    <p>Hello there!</p>
                </div >
            }
        </StoreContext.Consumer>
    )
}