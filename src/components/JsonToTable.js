import React from "react";
import "./JsonToTable.css";

export const JsonToTable = (props) => {

    const isEven = (a) => 0 === a % 2;

    const isArray = (a) => Array.isArray(a);

    const isPrimitive = (a) => "object" !== typeof a;

    const isObject = (a) => !isArray(a) && !isPrimitive(a);

    /*
    * This functions tries to handle arrays of objects in a visually 
    * aesthetic way (keys as column labels), even when the objects 
    * don't all have the same keys (that's the tricky part)
    */
    const buildArrayOfObjects = (arr) => {

        const allKeys = arr.map(e => Object.keys(e));
        const allKeysFlat = [].concat.apply([], allKeys);
        const allKeysSet = new Set(allKeysFlat);
        const thead = Array.from(allKeysSet);

        return (
            <table className="small-table">
                <thead>
                    <tr>
                        {thead.map(e => <th>{e}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {arr.map((e, i) =>
                        <tr>{thead.map((k, j) =>
                            <td className={isEven(i)
                                ? "td_row_even"
                                : "td_row_odd"}>
                                {e.hasOwnProperty(k)
                                    ? isObject(e[k])
                                        ? buildTable(e[k])
                                        : isArray(e[k])
                                            ? buildArray(e[k])
                                            : e[k]
                                    : null}
                            </td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }


    /*
    * takes the data and returns the final table
    */
    const buildTable = (data) => {

        if (isArray(data)) {
            return buildArray(data);
        }
        console.log(data);
        return (
            <table style={{ width: "100%" }}>
                <tbody>
                    {
                        // json is not an array. iterating over its properties
                        data // result of async operation so need to check that it's there for intermediate renders
                            ? Object.keys(data).map(c =>

                                (isPrimitive(data[c]) || isArray(data[c]))
                                    // case where the value is an array or a primitive
                                    ? (isArray(data[c]))

                                        // value is an array
                                        ? <tr>
                                            <td colSpan="2">
                                                <div className="td_head">
                                                    {c}
                                                </div>
                                                {buildArray(data[c])}
                                            </td>
                                        </tr>

                                        // value is a primitive (end leaf)
                                        : <tr>
                                            <td>
                                                <div className="td_head">
                                                    {c}
                                                </div>
                                            </td>
                                            <td>
                                                {data[c] ? <div className="td_row_even">{data[c]}</div> : null}
                                            </td>
                                        </tr>

                                    // value is an object
                                    : <tr>
                                        <td colSpan="2">
                                            <div className="td_head">
                                                {c}
                                            </div>
                                            {buildTable(data[c])}
                                        </td>
                                    </tr>
                            )
                            : null
                    }
                </tbody>
            </table >
        )
    }

    const buildArray = (arr) => {

        // empty array, return empty div
        if (arr.length === 0) {
            return <div style={{ fontSize: "small" }}> None.</div >
        }

        return (
            isObject(arr[0]) // assuming type homogenity inside arrays (if first elt is obj, all are.)

                ? buildArrayOfObjects(arr)

                // array and primitive
                : isArray(arr[0])

                    // array
                    ? <table>
                        <tr>
                            {
                                arr.map((item) =>
                                    <td colSpan="2">
                                        <div className="td_head"></div>
                                        {buildArray(item)}
                                    </td>
                                )
                            }
                        </tr>
                    </table>

                    // string
                    : <ul className="api-results-ul">
                        {arr.map(item => <li>{item}</li>)}
                    </ul>


        )
    }

    return (
        <div className="api-results">
            {buildTable(props.json, "api-results")}
        </div>
    )
}