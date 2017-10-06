import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';

import '../imports/api/users'; 
import { Links } from '../imports/api/links'; 
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

    WebApp.connectHandlers.use((req, res, next) => {
        
        // console.log(req.url, req.headers, req.query); 
        if( req.url !== '/') {

                        
            const _id = req.url.slice(1);  
    
            var link = Links.findOne({ _id });

            console.log(_id , link);

            if( link ) {
                
                // set HTTP Status Code 
                res.statusCode = 302;
                // Set HTTP Headers         
                res.setHeader('Location', link.url);
                // Set HTTP Body 
                // res.write('asd')
                // END HTTP Request                
                res.end();
            } 

        }
        

        // go on 
        next();

    });
    
});
