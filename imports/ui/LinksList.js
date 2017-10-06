// Core
import React from 'react'; 
import { Meteor } from 'meteor/meteor'; 
import { Tracker } from 'meteor/tracker'; 
import { Session } from 'meteor/session';

// API 
import { Links } from '../api/links'; 

// UI
import LinksListItem from './LinksListItem'; 

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
            
            const links = Links.find(
                {
                    visible: Session.get('showVisible')
                }
            ).fetch(); 
            
            this.setState({ links });

        });

    }

    componentWillUnmount(){
        console.log('componentWillUnmount Links list'); 

        this.LinksTracker.stop();

    }

    renderLinksListItems(){

        return this.state.links.map( (link) => {
            const shortUrl = Meteor.absoluteUrl(link._id); 

            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            
        });
        
    }

    render() {
        return ( 
        <div>
            <p>Links List</p>
            
            {this.renderLinksListItems()}
            
        </div>
        )
    }

}