import React from "react";
import "./JsonToTable.css";

export const JsonToTable = (props) => {

    // const isEven = (a) => 0 === a % 2;

    const isArray = (a) => Array.isArray(a);

    const isPrimitive = (a) => "object" !== typeof a; // enough for our purposes here

    const isObject = (a) => !isArray(a) && !isPrimitive(a);


    /*
    * takes the data and returns the final table
    */
    const buildTable = (data, className) => {

        if (isArray(data)) {
            return buildArray(data, className);
        }
        console.log(data);
        return (
            <table className={className}>
                <tbody>

                    {
                        // json is not an array. iterating over its properties
                        data // result of async operation so need to check that it's there for intermediate renders
                            ? Object.keys(data).map(c =>

                                (isPrimitive(data[c]) || isArray(data[c]))
                                    // case where the value is an array or string
                                    ? (isArray(data[c]))

                                        // value is an array
                                        ? <tr>
                                            <td colSpan="2">
                                                <div className="td_head">
                                                    {c}
                                                </div>
                                                {buildArray(data[c], "small-table")}
                                            </td>
                                        </tr>

                                        // value is a string or int (end leaf)
                                        : <tr>
                                            <td>
                                                <div className="td_head">
                                                    {c}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="td_row_even">
                                                    {data[c]}
                                                </div>
                                            </td>
                                        </tr>

                                    // value is an object
                                    : <tr>
                                        <td colSpan="2">
                                            <div className="td_head">
                                                {c}
                                            </div>
                                            {buildTable(data[c], "small-table")}
                                        </td>
                                    </tr>
                            )
                            : null
                    }
                </tbody>
            </table >
        )
    }

    const buildArray = (arr, className) => {

        // empty array, return empty div
        if (arr.length === 0) {
            console.log("empty array");
            return <div></div>
        }

        return (
            <table className={className}>
                <tbody>

                    {isObject(arr[0]) // assuming type homogenity inside arrays (if first elt is obj, all are.)

                        // object
                        ? <table>
                            <thead>
                                {arr.map((item, idx) => idx === 0
                                    ? <tr>{
                                        Object.keys(item).map(i =>
                                            <th>
                                                <div className="td_head">
                                                    {i}
                                                </div>
                                            </th>
                                        )
                                    }</tr>
                                    : null)
                                }
                            </thead>
                            <tbody>
                                {arr.map((item, idx) =>
                                    <tr>{Object.values(item).map(i =>
                                        <td className={idx % 2 === 0 ? "td_row_even" : "td_row_odd"}>{isObject(i) ? null : i.toString()}</td>)
                                    }</tr>)}
                            </tbody>
                        </table>


                        // array and primitive
                        : <tr>
                            {
                                arr.map((item) =>
                                    (isArray(item))

                                        // array 
                                        ? <td colSpan="2">
                                            <div className="td_head"></div>
                                            {buildArray(item, className)}
                                        </td>

                                        // string
                                        : <td>
                                            <div className="td_head">
                                                &nbsp;
                                            </div>
                                        </td>)
                            }
                        </tr>
                    }

                </tbody>
            </table>
        )
    }

    return buildTable(props.json, "api-results");
}