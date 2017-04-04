const processMessage = require('../helpers/processMessage');
const beginLogin = require('../helpers/beginLogin');
const processPostback = require('../helpers/processPostback');
const miID="1194773757216781";
var sender;
var login=false;
var celular="";
const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';
module.exports = (req, res) => {
	    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
				sender = event.sender.id;
				if (event.message && sender != miID){
					console.log("ESTOS SON LOS ATTACHMENTS: ",event.message.attachments);
					processMessage(event,login, celular);
					
				}
				else if (event.account_linking) 
				{
					if(event.account_linking.status==='linked'){
						login = true;
					}
					else{
						login = false;
					}
					
					beginLogin(event);
					console.log("account linking EVENTO BONITO: ",event);					
					celular = event.account_linking.authorization_code;
				}
				else if(event.postback){
					//menu = event.postback.payload;
					//processMessage(event);
					processPostback(event,login,celular);
					console.log("en el postback =>",event.postback.payload);
					
				}
				
				//console.log("Eventos: ",event);
				
            });
        });

        res.status(200).end();
    }
	
};


