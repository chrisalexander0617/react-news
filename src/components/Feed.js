import React from 'react';

function Feed(props){
    return (
        <>
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-4">
                    {props.articleCards}
                </div>
            </div>
        </>
    )
}

export default Feed