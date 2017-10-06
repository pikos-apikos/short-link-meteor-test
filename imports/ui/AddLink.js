import React from 'react'; 
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'; 

export default class AddLink extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            url: '',
            error: '',
            isOpen: false 
        }
    }

    resetForm(){
        this.setState( {
            url: '',
            error: '',
            isOpen: false 
        })
    }    

    onSubmit(e) {

        e.preventDefault();
        
        const { url } = this.state; 

        
        if(url) {

            Meteor.call('links.insert', url, (err, res) => {
                if(err){
                    this.setState({
                        error: err.reason
                    });
                } else {
                    this.resetForm();
                }

            });
            
            
        }

    }

    onChange(e) {

        this.setState({
            url: e.target.value.trim()
        })

    }

    render(){
        return (
            <div>
                <button className="button" onClick={()=> this.setState({isOpen: true}) }>Add Link</button>

                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Link" 
                    onAfterOpen={()=> this.refs.url.focus()}
                    onRequestClose={ () => this.resetForm() }
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <p>Add Link</p>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}     
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input 
                            type="text" 
                            name="url" 
                            ref="url" 
                            placeholder="URL: http(s)://..." 
                            value={this.state.url} 
                            onChange={this.onChange.bind(this)}
                            />
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={ ()=> this.resetForm() }>Cancel</button>
                    </form>
                </Modal>

                
            </div>
        )
    }

}