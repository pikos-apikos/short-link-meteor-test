import React from 'react'; 
import { Session } from 'meteor/session'; 
import { Tracker } from 'meteor/tracker'; 

export default class LinksListFilters extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            showVisible: false
        }
    }

    componentDidMount(){
        
        this.showVisibleTracker = Tracker.autorun(()=>{ 
            this.setState({ showVisible: Session.get('showVisible') });             
        });

    }

    componentWillUnmount(){
        
        this.showVisibleTracker.stop();

    }

    onChange(e) {
        
        Session.set('showVisible', !e.target.checked); 

    }    

    render() {
        return(
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={this.onChange.bind(this)} />
                
                    Show hidden links
                </label>
                
            </div>
        )
    }
    
}