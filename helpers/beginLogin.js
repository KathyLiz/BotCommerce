const FACEBOOK_ACCESS_TOKEN = 'EAAKfsoZCXAxEBACBjaIvID4agePR66jZBlkIXO3zd1U7UH5p09BwN6GZAslJboOao3i6zDYxHRt0Xw6oe7XJbZBHK5ZC4syZBZBDdYsCeVtkDDD0Kv3OjYRBHO9LALihz6yKnJMiXivCeZCyovEtKKQngW7IbvzaLKrbASHGqUPiEwZDZD';
const API_AI_TOKEN = '24ffa89ecf2e4297a34dc7900eb8d64a';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const wsM = require('./ws_miMovistarNode.js');

var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(FACEBOOK_ACCESS_TOKEN);

const request = require('request');

	const quickRepliesLogin =[
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
			messenger.sendQuickRepliesMessage(senderId,userpi+indicaciones,quickRepliesLogin,"REGULAR", function (err, body) {
			if (err) return console.error(err)
			});
			
		}		
		});
	 }	
		else{
			messenger.sendTextMessage(senderId,"Vuelve pronto!! :)");
		}
	 
};