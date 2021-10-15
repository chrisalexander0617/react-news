import React from 'react';

function ArticleCard(props){
   
    var articleCardStyles = {
        background:`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${props.img})`,
        backgroundSize:'cover',
        backgroundPosition:'center'
    }

    return (
        <>
            <a href={props.link}>
                <div style={ articleCardStyles } className="article-card rounded-lg border">
                    <header className="article-card-title rounded-t-lg text-2xl font-extrabold mb-3 text-white">
                    {props.title}
                    </header>
                </div>
            </a>
        </>
    )
}

export default ArticleCard