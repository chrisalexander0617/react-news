import React from 'react';

function Search(props){
    return (
        <>
        {/* value = state handle change will update state  */}
            <div>
                <input 
                    onKeyPress={props.handleKeyPress} 
                    onChange={props.handleChange} 
                    value={props.value} 
                    className="border search-input px-2 py-3 shadow-lg rounded-l-xl" 
                    type="text" 
                    placeholder="Enter location" 
                    required
                />
                <button 
                    onClick={props.handleClick} 
                    className="border search-button px-2 py-3 bg-red-400 text-white rounded-r-xl shadow-lg"
                >
                Search
                </button>
            </div>
        </>
    )
}

export default Search