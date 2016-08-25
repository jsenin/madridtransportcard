var request = require("request");
var parseString = require('xml2js').parseString;
var _ = require('underscore');


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.query = function(card_id, callback) {

    var formated_card = '001000000001' + pad(card_id, 10);
 
    var body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' + 
               ' <soapenv:Header/>' + 
               '  <soapenv:Body>' + 
               '   <tem:ConsultaSaldo1>' + 
               '    <tem:sNumeroTTP>' + formated_card + '</tem:sNumeroTTP>' + 
               '   </tem:ConsultaSaldo1>' + 
               ' </soapenv:Body>' + 
               '</soapenv:Envelope>';

    var options = { 
        method: 'POST',
        url: 'http://www.citram.es:50081/VENTAPREPAGOTITULO/VentaPrepagoTitulo.svc',
        qs: { 
            wsdl: ''  
        },
        headers: 
        { 
            'cache-control': 'no-cache',
            'soapaction': 'http://tempuri.org/IVentaPrepagoTitulo/ConsultaSaldo1',
                'content-type': 'text/xml' 
        },
        body: body 
    };

    request(options, function (err, response, body) {
        console.log('looking for', formated_card);
        if (err) throw new Error(err);
       
        parse_response(body, function(err, content) {
            return callback(err, content);
        }); 
    });
}


function extractMeaningContent(data) {
    var regex = /<a:sResulXMLField>(.*)<\/a:sResulXMLField>/;
    var matches = data.match(regex);

    if (matches[1])
        return _.unescape(matches[1]);

    return false;
}


function extractTTPSearchResult(data, callback) {

    parseString(data, function(err, result) {
        var TTPSearchResult;

        if (err) return callback(err, result);

        TTPSearchResult = result.SS_prepagoConsultaSaldo.TTPSearchResult; 

        if (!TTPSearchResult) return callback(new Error('TTPSearchResult object not valid'), '');

        return callback(err, TTPSearchResult);
    });
}

function toJson(data) {
    return JSON.stringify(data);
}

function parse_response(data, callback) {

    var content;
    
    content = extractMeaningContent(data)  ;
    
    extractTTPSearchResult(content, function(err, result) {
        if (err) return callback(err, result); 

        return callback(err, result);
    });
}


