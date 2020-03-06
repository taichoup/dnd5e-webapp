import React from 'react';

// takes selectedTab, data
export const Results = (props) => {
    return (
        <div className="results">
            {props.data == null ? (<p>Loading...</p>) : (
                props.data.map(result => {
                    return (
                        < div className="result" key={result.index} >
                            <a href={`http://www.dnd5eapi.co${result.url}`}>{result.name}</a>
                        </div>
                    )
                })
            )}
        </div >
    );
}