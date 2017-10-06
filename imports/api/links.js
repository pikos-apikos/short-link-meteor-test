import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid'; 

export const Links = new Mongo.Collection('links'); 

if( Meteor.isServer) {
    Meteor.publish('links', function() {

        var userId = this.userId; 
        if( userId ) {
            return Links.find({userId: userId });  
        }      

    });
}
// resource.action
Meteor.methods({
   
    'links.insert'(url) {

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        
        new SimpleSchema({
            url: {                    
                type: String,
                label: 'Your Link',
                regEx: SimpleSchema.RegEx.Url        
            }
        }).validate({url});
        

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId
        })
    }

});
