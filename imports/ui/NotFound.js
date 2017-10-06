import React from 'react';
import {Link} from 'react-router'; 

export default () => {
   return ( 
    <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Page not found</h1>
            <p>404 Ups where am I?</p> 
            <Link  className="button button--link" to="/">Head Home</Link>            
        </div>
    </div>
    )
}
