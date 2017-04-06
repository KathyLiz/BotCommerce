const FACEBOOK_ACCESS_TOKEN = 'EAAKfsoZCXAxEBACBjaIvID4agePR66jZBlkIXO3zd1U7UH5p09BwN6GZAslJboOao3i6zDYxHRt0Xw6oe7XJbZBHK5ZC4syZBZBDdYsCeVtkDDD0Kv3OjYRBHO9LALihz6yKnJMiXivCeZCyovEtKKQngW7IbvzaLKrbASHGqUPiEwZDZD';

var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(FACEBOOK_ACCESS_TOKEN);

const DB_CONEXION = require('./conexionMongo');

var valorAtencion = null;
var valorServicio = null;

const quickReplies = [
    {
        "content_type":"text",
        "title":"1",
        "payload":"1",
    },
    {
        "content_type":"text",
        "title":"2",
        "payload":"2",
    },
    {
        "content_type":"text",
        "title":"3",
        "payload":"3",
    },
    {
        "content_type":"text",
        "title":"4",
        "payload":"4",
    },
    {
        "content_type":"text",
        "title":"5",
        "payload":"5",
    }
];

function s_encuesta() {
};

s_encuesta.prototype.action = null;
s_encuesta.prototype.number = null;
s_encuesta.prototype.query = null;
s_encuesta.prototype.senderId = null;

s_encuesta.prototype.servicioEncuesta = function() {
    var action = this.action;
    var number = this.number;
    var query = this.query;
    var senderId = this.senderId;

    if (action === 'encuesta' && query === 'Claro') {
        messenger.sendQuickRepliesMessage(senderId,"¿Cómo calificarías la ATENCIÓN que ha recibido? toma en cuenta que 1 es Pésimo :( y 5 es Excelente :D ", quickReplies,"REGULAR", function (err, body) {
            if (err) return console.error(err)
        });
    } else if (action === 'respuesta-encuesta' && number) {
        if (parseInt(number,10) > 0 && parseInt(number,10) < 6 && valorAtencion === null) {
            valorAtencion = number;
            messenger.sendQuickRepliesMessage(senderId,"¿Cómo calificarías el SERVICIO que ha recibido? toma en cuenta que 1 es Pésimo :( y 5 es Excelente :D ", quickReplies,"REGULAR", function (err, body) {
                if (err) return console.error(err)
            });
        } else if (parseInt(number,10) > 0 && parseInt(number,10) < 6 && valorServicio === null) {
            valorServicio = number;
            //registroDB();
            messenger.sendTextMessage(senderId,"Gracias por tu tiempo. Adiós! :D ");
            valorAtencion = null;
            valorServicio = null;
        } else {
            messenger.sendQuickRepliesMessage(senderId,"Incorrecto. Ingrese nuevamente", quickReplies,"REGULAR", function (err, body) {
                if (err) return console.error(err)
            });
        }
    }
};

function registroDB() {
    var conexion = new DB_CONEXION();

    var atencion = valorAtencion;
    var servicio = valorServicio;

    conexion.setValorAtencion(atencion);
    conexion.setValorServicio(servicio);

    conexion.registro();
};

s_encuesta.prototype.setAction = function(action){
    this.action = action;
};

s_encuesta.prototype.setNumber = function(number){
    this.number = number;
};

s_encuesta.prototype.setQuery = function(query){
    this.query = query;
};

s_encuesta.prototype.setSenderId = function(senderId){
    this.senderId = senderId;
};

module.exports = s_encuesta;