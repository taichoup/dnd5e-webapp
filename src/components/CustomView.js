import React from "react";
import "./CustomView.css";

export const CustomView = (props) => {

    const isEven = (a) => 0 === a % 2;

    const isArray = (a) => Array.isArray(a);

    const isPrimitive = (a) => "object" !== typeof a;

    const isObject = (a) => !isArray(a) && !isPrimitive(a);

    const displayList = (data) => {

        if (isArray(data)) {
            return displayArray(data);
        }

        return (
            <ul>
                {data ?
                    Object.keys(data).map((c, idx) => {
                        if (isArray(data[c]) && data[c].length) {
                            return (
                                <>
                                    <li key={c + idx}><span className="label">{c}</span></li>
                                    {displayArray(data[c])}
                                </>
                            )
                        } else if (isArray(data[c]) && !data[c].length) {
                            return <li key={c + idx}>{c}: <span className="none">none</span></li>
                        } else if (isPrimitive(data[c])) {
                            return (
                            <li key={c + idx}>
                                <span className="label">{c}</span>: <span className="primitive">{data[c]}</span>
                            </li>
                            );
                        } else if (isObject(data[c])) {
                            return (
                                <>
                                    <li key={c + idx}><span className="label">{c}</span></li>
                                    {displayList(data[c])}
                                </>
                            )
                        }
                        return null;
                    }) : null
                }
            </ul>
        )
    }

    const displayArray = (arr) => {

        // assuming type homogenity inside arrays (if first elt is obj, all are.)
        if (isObject(arr[0])) {
            return displayArrayOfObjects(arr);
        } else if (isArray(arr[0])) {
            return (
                <ul>
                    {arr.map(item => <><li></li>{displayArray(item)}</>)}
                </ul>
            );
        } else if (isPrimitive(arr[0])) {
            return (
                <ul>
                    {arr.map(item => <li><span className="primitive">{item}</span></li>)}
                </ul>
            );
        }
        return null;
    }

    const displayArrayOfObjects = (arr) => {

        return (
            <ul>
                {arr.map((e, i) => {
                    return (
                        <>
                            <li>{e.name}</li>
                            <ul>
                                {Object.keys(e)
                                    .filter(k => k !== "name")
                                    .map((prop, idx) => {
                                    return (
                                        <li key={prop + idx}>
                                            <span className="label">{prop}: </span>
                                            {isArray(e[prop])
                                                ? displayArray(e[prop])
                                                : isObject(e[prop])
                                                    ? displayList(e[prop])
                                                    : e[prop]
                                            }
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="api-results">
            {displayList(props.json)}
        </div>
    )
}