import React from 'react'; 
import { Meteor } from 'meteor/meteor'; 
import { Tracker } from 'meteor/tracker'; 

import { Links } from '../api/links'; 


export default class LinksList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            links: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount Links list'); 


        this.LinksTracker = Tracker.autorun(()=>{ 
            Meteor.subscribe('links'); 
            
            const links = Links.find().fetch(); 
            
            this.setState({ links });

            // console.log('Links:' , links); 
        
        
        });

    }

    componentWillUnmount(){
        console.log('componentWillUnmount Links list'); 

        this.LinksTracker.stop();

    }

    renderLinksListItems(){

        return this.state.links.map( (link) => {
            return <li key={link._id}>{link.url}</li>
        });
        
    }

    render() {
        return ( <div>
            <p>Links List</p>
            
            <ul>
                {this.renderLinksListItems()}
            </ul>

        </div>
        )
    }

}