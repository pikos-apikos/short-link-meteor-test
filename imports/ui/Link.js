import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'; 
import { Links } from '../api/links'; 

import LinksList from './LinksList'; 

export default class Link extends React.Component {
   
    constructor(props){
        super(props); 
    
        this.state = {
            error: ''
        }; 
    
    }

    onLogout(){
       Accounts.logout();

       
    }

    onSubmit(e) {

        e.preventDefault();
        
        const url = this.refs.url.value.trim(); 
                 
        if(url) {

            Meteor.call('links.insert', url, (err, res) => {
                if(err){
                    this.setState({
                        error: err.reason
                    });
                } else {
                    this.setState({
                        error: ''
                    })
                }

                console.log( err, res ); 
            });
            
            this.refs.url.value = ''; 

        }

    }

    render(){
        return ( 
            <div>
                <h1>Your Links</h1>

                <LinksList />

                {this.state.error ? <p>{this.state.error}</p> : undefined}     
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" name="url" ref="url" placeholder="URL: http(s)://..." />
                    <button>Add Link</button>
                </form>

                
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
            
        )
    }

}
