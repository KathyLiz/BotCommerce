const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';
const API_AI_TOKEN = '074dc51f16164cb990235ca2a37a984c';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const wsM = require('./ws_miMovistarNode.js');

var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger('EAAFr75mEwRIBAFsodBiKzQ9kfhqkRDOZBhx8QYaGsbBbsmbbFoH6fFYFtrK2qXEsw9cgusPvoLDna6NpUByjGLiIOyaDjbVde9x0Qsm0E9l8m7YZAvUZBwNYINfk4ZB7pmR7ZADBLQFIfNrEKBbBxHZAnS4XJZC5fljl1W8OH9YzAZDZD');

const request = require('request');

const checkWhiteList = (senderId) => {
   request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
				"setting_type": "domain_whitelisting",
				"whitelisted_domains": ["https://e84ea710.ngrok.io"],
				"domain_action_type": "add"
			}
    });
};

	const quickReplies =[
      {
        "content_type":"text",
        "title":"Consultar mi saldo",
        "payload":"saldo",
      },
	  	  {
        "content_type":"text",
        "title":"Hacer una recarga",
        "payload":"recargas",
      },
      {
        "content_type":"text",
        "title":"Menu",
        "payload":"menu",
      }
    ];
	
module.exports = (event) => {
	
	const senderId = event.sender.id;
	checkWhiteList(senderId);

	

	if(event.account_linking.status === "linked"){
	
	messenger.getProfile(senderId, function (err, body) {
	  var genero = "Bienvenida ";
	  var  userpi;
		if (err) {
			return console.error(err)
			}
		else{
				if(body.gender === "female"){
					userpi = genero+body.first_name+"! :D ";
				}
				else{
					genero = "Bienvenido ";
					userpi = genero+body.first_name +"! :D ";
				}

			var indicaciones = "\nPresiona una de las opciones o escribe lo que deseas hacer";
			messenger.sendQuickRepliesMessage(senderId,userpi+indicaciones, quickReplies,"REGULAR", function (err, body) {
			if (err) return console.error(err)
			});
			
		}		
		});
		//Se envía las opciones disponibles para el usuario	
	 }	
		else{
			messenger.sendTextMessage(senderId,"Vuelve pronto!! :)");
		}
	 
};