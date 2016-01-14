var Card = require('./datasource/card');



function findByCardId( id, callback ){
    var options = {}
    options.card_id = id;

    return Card.find(options, callback );

}

function findExternal( id, callback ){
    var err = {} ;

    return callback( err, 'resultado externo' );
}

exports.get = function( id, callback ){
    var card = new Card();
    findByCardId( id , function( err, result ){
        if ( err ){
            return findExternal( id, callback );
        }
        return callback( err, result );
    })
}

exports.add = function ( id, callback ){

    var data = {'card_id' : id };
    var card = new Card(data);
    card.save(function(err, result){

        callback(err, result);

    });
};
