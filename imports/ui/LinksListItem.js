import React from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard'; 
import  moment from 'moment'; 

export default class LinksListItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            justCopied: false,            
        }

    }

    componentDidMount(){

        this.clip = new Clipboard(this.refs.copy);

        this.clip.on('success', () => {
            
            this.setState({
                justCopied: true
            });

            window.setTimeout(()=>{
                this.setState({
                    justCopied: false
                });
            }, 1000);

        }).on('error', function(e) {
            console.error('Clipboard Action:', e.action);
            console.error('Clipboard Trigger:', e.trigger);
        });

    }

    componentWillUnmount() {

        this.clip.destroy();

    }

    renderStats(){
        const visitMessage = (this.props.visitedCount==1) ? 'visit': 'visits'
        let visitedMessage = null; 
        if(typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return(
            <div>
                <p>{this.props.visitedCount} {visitMessage}  {visitedMessage}</p>
            </div>
        )
    }

    render(){
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.visible.toString()}</p>

                {this.renderStats()}
                

                <a href="{this.props.shortUrl}" target="_blank" className="button button--link button--pill">Visit</a>
                <button ref="copy" className="button button--pill" data-clipboard-text={this.props.shortUrl}>
                {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>

                <button ref="hide" className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
            </div>    
        )
    }
};

LinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number // not Required to  allow null 
};